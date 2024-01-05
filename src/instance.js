function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
        this.isStart = properties[0];
        this._worldInfo.SetVisible(properties[1]);
      }

      this._StartTicking();
    }

    Tick() {
      const wi = this.GetWorldInfo();
      const layer = wi.GetLayer();
      const viewport = layer.GetViewport();
      const box = wi.GetBoundingBox();

      // set bounding box to the viewport
      box.copy(viewport);
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        isStart: this.isStart,
      };
    }

    LoadFromJson(o) {
      this.isStart = o.isStart;
    }

    Draw(renderer) {
      const wi = this.GetWorldInfo();
      if (this.isStart) {
        let layer = wi.GetLayer();
        const x = wi.GetX();
        const y = wi.GetY();
        const w = wi.GetWidth();
        const h = wi.GetHeight();
        let start = layer.LayerToCanvasCss(x - wi._ox * w, y - wi._oy * h);
        let end = layer.LayerToCanvasCss(
          x + (1 - wi._ox) * w,
          y + (1 - wi._oy) * h
        );
        renderer.SetScissorRect(
          start[0] * devicePixelRatio,
          start[1] * devicePixelRatio,
          (end[0] - start[0]) * devicePixelRatio,
          (end[1] - start[1]) * devicePixelRatio
        );
      } else renderer.RemoveScissorRect();
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }

    _SetIsStart(isStart) {
      this.isStart = isStart;
    }

    _IsStart() {
      return this.isStart;
    }
  };
}

function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
        this.isStart = properties[0];
        this._worldInfo.SetVisible(properties[1]);
      }
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
        let box = wi.GetBoundingBox();
        let start = layer.LayerToCanvasCss(box.getLeft(), box.getTop());
        let end = layer.LayerToCanvasCss(box.getRight(), box.getBottom());
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

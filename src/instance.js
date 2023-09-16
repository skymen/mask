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
        // data to be saved for savegames
      };
    }

    Draw(renderer) {
      const wi = this.GetWorldInfo();
      if (this.isStart) {
        let layer = wi.GetLayer();
        let pos = layer.LayerToCanvasCss(wi.GetX(), wi.GetY());
        let size = layer.LayerToCanvasCss(wi.GetWidth(), wi.GetHeight());
        renderer.SetScissorRect(
          pos[0] * devicePixelRatio,
          pos[1] * devicePixelRatio,
          size[0] * devicePixelRatio,
          size[1] * devicePixelRatio
        );
      } else renderer.RemoveScissorRect();
    }

    LoadFromJson(o) {
      // load state for savegames
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

    _IsStart() {
      return this.isStart;
    }
  };
}

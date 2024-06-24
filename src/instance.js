function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
        this.isStart = properties[0];
        this._worldInfo.SetVisible(properties[1]);
      }

      this.MaybeMonkeyPatchRect();
      // this._StartTicking();

      const wi = this.GetWorldInfo();
      const oldGetBBox = wi.GetBoundingBox.bind(wi);
      wi.GetBoundingBox = () => {
        return wi.GetLayer().GetViewport();
      };
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

    MaybeMonkeyPatchRect() {
      const renderer = this._runtime.GetRenderer();
      if (!renderer || renderer.__skymen_clippingMaskPatch) return;
      this.oldSetScissorRect = renderer.SetScissorRect.bind(renderer);
      this.oldRemoveScissorRect = renderer.RemoveScissorRect.bind(renderer);
      renderer.SetScissorRect = (x, y, w, h, rtHeight = 0, force = false) => {
        if (force || !renderer.__skymen_clippingMaskForce) {
          this.oldSetScissorRect(x, y, w, h, rtHeight);
          renderer.__skymen_clippingMaskForce = force;
        }
      };
      renderer.RemoveScissorRect = (force = false) => {
        if (force || !renderer.__skymen_clippingMaskForce) {
          this.oldRemoveScissorRect();
          renderer.__skymen_clippingMaskForce = !force;
        }
      };
      renderer.__skymen_clippingMaskPatch = true;
    }

    Draw(renderer) {
      this.MaybeMonkeyPatchRect();
      const wi = this.GetWorldInfo();
      if (this.isStart) {
        let layer = wi.GetLayer();
        const x = wi.GetX();
        const y = wi.GetY();
        const w = wi.GetWidth();
        const h = wi.GetHeight();
        let start = layer.LayerToDrawSurface(x - wi._ox * w, y - wi._oy * h);
        let end = layer.LayerToDrawSurface(
          x + (1 - wi._ox) * w,
          y + (1 - wi._oy) * h
        );
        renderer.SetScissorRect(
          start[0],
          start[1],
          end[0] - start[0],
          end[1] - start[1],
          0,
          true
        );
      } else renderer.RemoveScissorRect(true);
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

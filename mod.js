//parks, decors, landing pads dont need power


ModTools.makeBuilding("WindTurbine", () => {return {
  update: function(timeMod){
    if(!this.inited){
      this.cinit();
    }
		var mainAnimSpeed = 4;
		var maxWaitTime = 0 ;
		var beginAnimTime = 480;
		var animLength = this.bgTextures.length * mainAnimSpeed * 2 + beginAnimTime + maxWaitTime;
		this.animProgress = (this.animProgress + timeMod) % animLength;
		if(this.animProgress < beginAnimTime) {
			this.backSprite.texture = this.bgTextures[(Math.floor(this.animProgress) / 4 | 0) % this.bgTextures.length];
		} else if(this.animProgress - beginAnimTime - maxWaitTime > this.bgTextures.length * mainAnimSpeed) {
			var val = this.bgTextures.length - 1 - (Math.floor(this.animProgress - this.bgTextures.length * mainAnimSpeed - beginAnimTime - maxWaitTime) / mainAnimSpeed | 0);
			var maxVal = this.bgTextures.length - 1;
			this.backSprite.texture = this.bgTextures[val < 0 ? 0 : val > maxVal ? maxVal : val];
		} else if(this.animProgress - beginAnimTime > this.bgTextures.length * mainAnimSpeed) {
			this.backSprite.texture = this.bgTextures[this.bgTextures.length - 1];
		} else {
			var val = Math.floor(this.animProgress - beginAnimTime) / mainAnimSpeed | 0;
			var maxVal = this.bgTextures.length - 1;
			this.backSprite.texture = this.bgTextures[val < 0 ? 0 : val > maxVal ? maxVal : val];
		}
  },
  cinit: function(){
    this.bgTextures = Resources.getTexturesByWidth("spr_wind_turbine",20);
    this.backSprite = new PIXI.Sprite(this.bgTextures[0]);
    this.backSprite.position.set(this.position.x,this.position.y);
    this.bgStage.addChild(this.backSprite);
    this.animProgress = 0;
    this.inited = true;
  }
};},"blank");

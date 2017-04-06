class Sounds_Singleton {
	private sounds = {};
	private soundsOn = true;

	soundsSet (state:boolean) {
		this.soundsOn = state;
	};

	soundsChange () {
		this.soundsOn = !this.soundsOn;
	};

	load (name, vol, obj) {
		this.sounds[name] = obj;
		this.sounds[name].volume = vol;
		this.sounds[name].load();
	};

	play (name) {
		if (this.soundsOn === true)
			{
				if (!this.sounds[name].ended)
					{
						let ss = this.sounds[name].cloneNode();
						ss.volume = this.sounds[name].volume;
						ss.play();
					}
				this.sounds[name].play();
			}
	};
}

let sounds = new Sounds_Singleton();

export default sounds;

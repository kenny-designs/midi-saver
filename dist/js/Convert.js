const MidiConvert = require('midiconvert');

class Convert {
    constructor(app) {
        // used for reading files
        this.reader = new FileReader();
        this.reader.onload = function(event) {
            MidiConvert.load(event.target.result, function(midi) {
                // load in our notes
                app.notes = midi.tracks[0].notes;
            });
        }.bind(this);

        this.reader.onerror = function(event) {
            console.error("File could not be read! Code " + event.target.error.code);
        }.bind(this);
    }

    // load in a midi to convert
    loadMidi(filepath) {
        this.reader.readAsDataURL(filepath);
    }
}

module.exports = Convert;

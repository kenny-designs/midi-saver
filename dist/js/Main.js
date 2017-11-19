const Soundfont     = require('soundfont-player');
const Recorder      = require('recorderjs');
const Convert       = require('./Convert.js');

class Main {
    constructor() {
        this.convert = new Convert(this);
        this.ac         = new AudioContext();   // AudioContext
        this.rec        = null;                 // recording with Recorderjs
        this.instrum    = null;                 // instrument we're playing with
        this.notes      = [];                   // array of the loaded notes
        this.midiSlug   = 'audio';              // name of the midi, default to audio

        // instrum select
        this.instrumSelect = document.getElementById('instrum-select');
        this.instrumSelect.addEventListener('change', function(event) {
            this.loadInstrum(this.instrumSelect.value);
        }.bind(this));

        // uploading midis
        this.midiFile = document.getElementById('midi-file');
        this.midiFile.addEventListener('change', function(event) {
            this.convert.loadMidi(this.midiFile.files[0]);
            this.midiSlug = this.midiFile.files[0].name;
            // trim filename
            this.midiSlug = this.midiSlug.replace(/\.[^/.]+$/, '');
        }.bind(this));

        // set up play button for playing notes
        this.playButton = document.getElementById('play-btn');
        this.playButton.addEventListener('click', function(event) {
            this.playInstrum();
        }.bind(this));

        // export button
        this.exportButton = document.getElementById('export-btn');
        this.exportButton.addEventListener('click', function(event) {
            this.recInstrum();
        }.bind(this));

        this.init();
    }

    // set up program
    init() {
        // load default instrument
        this.loadInstrum(this.instrumSelect.value);
    }

    // plays the instrument
    playInstrum() {
        if (!this.instrum) {
            console.log('Instrum still loading...');
        }
        else {
            return this.instrum.schedule(this.ac.currentTime, this.notes);
        }
    }

    // records the midi
    recInstrum() {
        this.rec.record();
        var node = this.playInstrum();
        node[node.length - 1].source.onended = function(event) {
            this.rec.stop();
            this.exportInstrum();
        }.bind(this);
    }

    // exports the midi
    exportInstrum() {
         this.rec.exportWAV(function(e) {
                this.rec.clear();
                var anchor = document.createElement('a');
                document.body.appendChild(anchor);

                anchor.href = window.URL.createObjectURL(e);
                anchor.download = this.midiSlug +'.wav';
                anchor.click();
            }.bind(this));
    }

    // loads an instrument
    loadInstrum(ins) {
        Soundfont.instrument(this.ac, ins).then(function(piano) {
            this.instrum = piano;
            this.rec = new Recorder(piano);
        }.bind(this));
    }
}

module.exports = Main;

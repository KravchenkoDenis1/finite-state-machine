class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		this.actual = config.initial ;
		this.states = config.states;
		this.transitions = config.states.transitions;
		this.history = ['normal'];
		this.length = 1;
		this.undoValue = 1;
		this.redoValue = 0;
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		return this.actual;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		var i = this.length;
		if (state === 'normal' || state === 'hungry' || state === 'busy' || state === 'sleeping'){
			this.actual = state;
			this.history[i] = state;
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else {
			throw new Error();
		}
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		var i = this.length;
		if (event === 'study') {
			this.actual = 'busy';
			this.history[i] = 'busy';
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else if (event === 'eat' && this.actual === 'busy') {
			throw new Error();
		} else if (event === 'get_up' && this.actual === 'busy'){
			throw new Error();
		} else if (event === 'get_hungry'){
			this.actual = 'hungry';
			this.history[i] = 'hungry';
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else if (event === 'eat') {
			this.actual = 'normal';
			this.history[i] = 'eat';
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else if (event === 'get_tired'){
			this.actual = 'sleeping';
			this.history[i] = 'sleeping';
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else if (event === 'eat'){
			this.actual = 'normal';
			this.history[i] = 'normal';
			this.length++;
			this.undoValue++;
			this.redoValue = 0;
		} else {
			throw new Error();
		}
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.actual = 'normal';
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var mas = [];
		if (event == null) {
			mas = ['normal', 'busy', 'hungry', 'sleeping'];
		} else if (event === 'get_hungry'){
			mas = ['busy','sleeping'];
		} else if (event === 'study'){
			mas = ['normal'];
		}
		return mas;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		var checkUndo = false;
		var i = this.undoValue;
		if (i > 1){
			this.actual = this.history[i-2];
			checkUndo = true;
			this.undoValue--;
			this.redoValue++;
			} else {
			this.actual = this.history[i-2];
			this.redoValue++;
		}
		if (this.undoValue === 0) {
			checkUndo = false;
		}
		return checkUndo;
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		var checkRedo = false;
		var number = 1;
		var i = this.length;
		if (this.redoValue > 0){
			this.actual = this.history[i-this.redoValue];
			checkRedo = true;
			number = 0;
			this.redoValue--;
		} 
		if (this.redoValue === 0){
			checkRedo = false;
		}
		if (number === 0){
			checkRedo = true;
		}
		if (this.length === 1){
			checkRedo = false;
		}
		return checkRedo;
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.undoValue = 0;
		this.redoValue = 0;
		this.length = 1;
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

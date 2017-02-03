class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		this.actual = config.initial;
		this.states = config.states;
		this.transitions = config.states.transitions;
		this.history = [config.initial];
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
		if (state in this.states){
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
		var j = this.actual;
		var obj = this.states;
		var checkTrigger = 0;
			if (event in obj[j].transitions) {
				this.actual = obj[j].transitions[event];
				this.history[i] = obj[j].transitions[event];
				this.length++;
				this.undoValue++;
				this.redoValue = 0;
				checkTrigger = 1;
			} else {
				throw new Error();
			}
		if (checkTrigger === 0){
			throw new Error();
		}
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.actual = this.history[0];
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var mas = [];
		var j = 0;
		var i = 0;
		var obj = this.states;
		if (event == null) {
			for (j in obj) {
				mas[i] = j;
				i++;
			}
		} 
		for (j in obj){
			if (event in obj[j].transitions) {
				mas[i] = j;
				i++;
			}
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

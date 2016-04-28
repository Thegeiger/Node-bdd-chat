var basic_class = {
  MAGE : {
  	value: 0, MP: 3, HP: 300,
  		status: {
  			will: 4, reflex: 1, vigor: 1
  		},
  		skill: {
  			bdf: {
  				dommage: 30,
  				prt: 10,
  				AP: 5,
  				effect: null
  			}
  		}
  },
  SUMONERS {
  	value: 1, MP: 3, HP: 350, 
  	  	status: {
			will: 3, reflex: 2, vigor: 1
		}
  },
  ARCHER {
  	value: 2, MP: 4, HP: 400,
  		status: {
			will: 1, reflex: 3, vigor: 2
		}
  },
  PALADIN : {
  	value: 3, MP: 3, HP: 600,
  	  	status: {
			will: 3, reflex: 1, vigor: 2
		}
  },
  BARBAR : {
  	value: 4, MP: 4, HP: 500,
  		status: {
			will: 1, reflex: 2, vigor: 3
		}
  }
  ROGUE : {
  	value: 5, MP: 5, HP: 400,
  	  	status: {
			will: 1, reflex: 4, vigor: 1
		}
  }
  SCOOT : {
    value: 6, MP: 4, HP: 400,
      	status: {
			will: 1, reflex: 4, vigor: 1
		}
  }
  BARDE : {
    value: 7, MP 4, HP: 400,
      	status: {
			will: 2, reflex: 2, vigor: 2
		}
  }
};

var personage = {
	name: "",
	_class: null,
	lvl: 0,
	carac: {
	force: 1,
	intel: 1,
	agi: 1,
	sagesse: 1,
    charisme: 1,
    constitution: 1
	},
  stat: {
    HP: 0,
    MP: 0,
    AP: 10,
    will: 0,
    reflex: 0,
    vigor: 0
  },
  skill: null;
}
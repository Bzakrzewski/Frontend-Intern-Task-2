(function () { 
    // Creating runes
    class Rune {
       constructor (name, value, cannotBeLinkedWith) {
        this.name = name;
        this.value = value;
        this.cannotBeLinkedWith = cannotBeLinkedWith;
       } 
    }

    let runeBook = [
        El = new Rune('El', 28, 'Ort'),
        Eld = new Rune('Eld', 33, 'Sur'),
        Tir = new Rune('Tir', 9, 'Eth'),
        Nef = new Rune('Nef', 7, 'Ist '),
        Eth = new Rune('Eth', 31, 'Tir'),
        Ith = new Rune('Ith', 22, 'Pul'),
        Tal = new Rune('Tal', 8, 'Io'),
        Ral = new Rune('Ral', 25, 'Um'),
        Ort = new Rune('Ort', 18, 'El'),
        Thul = new Rune('Thul', 13, 'Sol'),
        Amn = new Rune('Amn', 6, 'Fal'),
        Sol = new Rune('Sol', 10, 'Thul'),
        Shael = new Rune('Shael', 17, 'Lem'),
        Dol = new Rune('Dol', 11, 'Hel'),
        Hel = new Rune('Hel', 12, 'Dol'),
        Io = new Rune('Io', 20, 'Tal'),
        Lum = new Rune('Lum', 32, 'Gul'),
        Ko = new Rune('Ko', 27, 'Mal'),
        Fal = new Rune('Fal', 14, 'Amn'),
        Lem = new Rune('Lem', 26, 'Shall'),
        Pul = new Rune('Pul', 15, 'Ith'),
        Um = new Rune('Um', 16, 'Ral'),
        Mal = new Rune('Mal', 21, 'Ko'),
        Ist = new Rune('Ist', 4, 'Nef'),
        Gul = new Rune('Gul', 23, 'Lum'),
        Vex = new Rune('Vex', 24, 'Ohm'),
        Ohm = new Rune('Ohm', 1, 'Vex'),
        Lo = new Rune('Lo', 2, 'Cham'),
        Sur = new Rune('Sur', 30, 'Eld'),
        Ber = new Rune('Ber', 3, 'none'), 
        Jah = new Rune('Jah', 5, 'Zod'),
        Cham = new Rune('Cham', 29, 'Lo'),
        Zod = new Rune('Zod', 19, 'Jah')
    ];
    var runeComb;

    let argument = process.argv[2];
        if (isNaN(argument)) {
                console.log("Insert a number");
            } else if (!isNaN(argument) && argument > 0 && argument <= runeBook.length) {
                console.log("Good input");
                generateRunicWords(runeBook, argument);
            } else if (!isNaN(argument) && parseInt(argument) < 1) {
                console.log(`Number is too low. Choose one between range 1 and ${runeBook.length}`);
            } else if (!isNaN(argument) && argument >= runeBook.length) {
                console.log(`Number is too high. Choose one between range 1 and ${runeBook.length}`);
            }



    function generateRunicWords(runeBook, argument) { 
        let runeCombValue, runeCombValueSum, runeCombNames,
            tenMostPowerfulSpells = [];

        function k_combinations(set, k) {
            let i, j, combs, head, tailcombs;
            // There is no way to take e.g. sets of 5 elements from
            // a set of 4.
            if (k > set.length || k <= 0) {
                return [];
            }
            // K-sized set has only one K-sized subset.
            if (k == set.length) {
                return [set];
            }
            // There is N 1-sized subsets in a N-sized set.
            if (k == 1) {
                combs = [];
                for (i = 0; i < set.length; i++) {
                    combs.push([set[i]]);
                }
                return combs;
            }
            combs = [];
            for (i = 0; i < set.length - k + 1; i++) {
                // head is a list that includes only our current element.
                head = set.slice(i, i + 1);
                // We take smaller combinations from the subsequent elements
                tailcombs = k_combinations(set.slice(i + 1), k - 1);
                // For each (k-1)-combination we join it with the current
                // and store it to the set of k-combinations.
                for (j = 0; j < tailcombs.length; j++) {
                    combs.push(head.concat(tailcombs[j]));
                }
            }
            return combs;
        }
        // Source: https://gist.github.com/axelpale/3118596

        // Combination of runes
        runeComb = k_combinations(runeBook, argument);

        //Convert elements of combinations to their values
        runeCombValue = runeComb.map(x => x.map(y => y.value));

        // Sum of those values.
        runeCombValueSum = runeCombValue.map(x => (x.reduce((a, b) => a + b, 0)) -x.length);

        for(let i = 0; i < runeCombValue.length; i++){
           runeCombValue[i].push(runeCombValueSum[i]);
        }

        // Change those values to names of runes with whom they are connected. 
        runeCombNames = runeComb.map(x => x.map(y => y.name));

        for(let i = 0; i < runeCombNames.length; i++){
           runeCombNames[i].push(runeCombValueSum[i]);
        }

        // Arrange sums descending
        runeCombNames.sort((array, secArray) => {
            return array[array.length-1] - secArray[secArray.length-1]
        });
        runeCombNames.reverse();           

        //Choose top 10 most powerful sums or all sum (if there are less than 10). 
        if (runeCombNames.length >= 10) {
            for(let i =0; i < 10; i++) {
             tenMostPowerfulSpells[i] = runeCombNames[i];
            }
        } else {
           tenMostPowerfulSpells = runeCombNames;   
        }

        //Console login them
        tenMostPowerfulSpells.forEach(spell => {
            let length, all, spells, power;
            length = spell[spell.length-1].toString().length
            all = spell.join('-')
            spells = spell.join('-').substring(0, all.length-length-1);
            power = all.substring(all.length-2);
            console.log(spells, 'power is:', power)
        });

        checkRunicWord(tenMostPowerfulSpells);
    }


    function checkRunicWord(el) {
        let tenMostElements, dontLinkedWith, loger,
            checkingVal = [],
            spellValues = [],
            checkSum = [];

        for(let i =0; i < el.length; i++) {
            spellValues.push(el[i].splice((el[i].length - 1), 1));
        }

        tenMostElements = el.map(x=> x.map((function (tenMostEl) {
            let el;
            Object.entries(runeBook).filter(runeBook => {
                if(runeBook[1].name === tenMostEl){
                    el = runeBook[1]
                }
            })
            return el
            })))

        dontLinkedWith = tenMostElements.map(x => x.map(y => y.cannotBeLinkedWith));

        checkingVal[0] = el[0].map(x => {
                   return {
                        appear: dontLinkedWith[0].indexOf(x) == -1 ? 0 : 1
                    }
         });

        // Comparing runes names with names of runes that they cannot be linked with
        for (let i=0; i<el.length; i++) {
            let checking = [],
                checkValue = [];

            checking[i] = el[i].map(x => {
                    return {
                        appear:  dontLinkedWith[i].indexOf(x) == -1 ? 0 : 1
                    }
                }) 
            checkValue[i] = checking[i].map(x =>  x = x.appear);
            checkSum[i] = checkValue[i].reduce(add, 0);
                function add(a, b) {
                return a + b;
                }
        };

        // Console login name of the spell, spell's power, and eventually warning that this spell doesnt work
        loger = checkSum.map((truefalse, index) => {
            let log = truefalse ? `Warning: this spell does not work. ${el[index].join('-')} power: ${spellValues[index]}` : `${el[index].join('-')} power: ${spellValues[index]}`; 
            return log;
        })
        loger.map(toLog => console.log(toLog));
    }
})();
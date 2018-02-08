// https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIA.svg
const grid = document.querySelector('.grid');
//const apiUrl = 'https://feeds.nfl.com/feeds-rs/scores.json';
const apiUrl = 'https://jimwib.github.io/nfl-data/data/1995.json';
const colors = new Colors();

function game(homeTeam, visitorTeam, homeTeamBackground, visitorTeamBackground, game) {
    return `<div class="game">
                <div class="team home" style="background: linear-gradient(to left, #${homeTeamBackground[0]} 10%, #${homeTeamBackground[0]} 90%)">
                    <div>
                        <div>${wrapWords(homeTeam)}</div>
                        <div>${game.hs}</div>
                    </div>
                </div>
                <div class="team visitor" style="background: linear-gradient(to left, #${visitorTeamBackground[0]} 10%, #${visitorTeamBackground[0]} 90%)">
                    <div>
                        <div>${wrapWords(visitorTeam)}</div>
                        <div>${game.vs}</div>
                    </div>
                </div>
            </div>`;
}


function week(week, type){


    return `
                <div class="item week-marker">
                    <p class="week"><span class="block">Week</span> 
                        <span class="block">${inWords(week)}</span>
                        <span class="block">${type}</span>

                    </p>
                </div>
        `;
}

Array.prototype.chunk = function(groupsize){
    var sets = [], chunks, i = 0;
    chunks = this.length / groupsize;

    while(i < chunks){
        sets[i] = this.splice(0,groupsize);
    i++;
    }
    
    return sets;
};

function _wrap(str){
  //return str.replace(/\w+/g, "<span>$&</span>");
  return `<span>${str}</span>`;

}

function wrapWords(str, tmpl) {
    let words = str.split(' ');
    let length = words.length;
    let output = "";
    let chunks = words.chunk(2);

    if(chunks.length > 1) {
        chunks.forEach(chunk => {
            output +=  _wrap(chunk.join(" "));
    
        });
    } else {
        output += chunks[0].join(" ").replace(/\w+/g, "<span>$&</span>")
    }
    
/*
    if(length < 3) {
        output = _wrap(words.slice(0,2).join(" "));

    } else {
        output = _wrap(words.slice(length-,).join(" "));

        console.log(words);
    }

    */


    return output;
    
    //console.log(words);
}


function inWords (num) {
    let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
    return str;
}


const fillRange = (start, end) => {
  return Array(end - start + 1).fill().map((item, index) => start + index);
};

let el = document.createElement('ol');
const years = fillRange(1990,2018);
let html = '';
years.forEach(item => {
    html += `<li><a>${item}</a></li>`;
});
el.innerHTML = html;
el.setAttribute('id', 'years');
document.body.append(el);


fetch(apiUrl)
    .then(blob => blob.json())
    .then(data => {
        console.log(data.weeks.length);

        let weeks = data.weeks;        
        let postWeek = 1;

        weeks.forEach(week => {
            let el = document.createElement('li');

            if(week.type == 'POST') {
                week.week = postWeek;

                postWeek+=1;
            }
            el.innerHTML = window.week(week.week, week.type); 
            grid.append(el);
            week.games.forEach(game => {

                if(game.gt == "PRO") return;

                
                let homeTeamData = colors.findById(game.h);
                let homeTeam = homeTeamData.name;
                
                let visitorTeamData = colors.findById(game.v);
                let visitorTeam = visitorTeamData.name;

                let homeTeamBackground = homeTeamData.colors.hex;
                let visitorTeamBackground = visitorTeamData.colors.hex;

                el = document.createElement('li');
                el.innerHTML = window.game(
                        homeTeam, 
                        visitorTeam,
                        homeTeamBackground,
                        visitorTeamBackground,
                        game
                        );
                grid.append(el);
            });
        });

        /*
        
        el.innerHTML = window.week(data.week);
        grid.append(el)
        console.log(data)
        data.gameScores.forEach(game => {
            console.log(game);
            let homeTeam = game.gameSchedule.homeDisplayName;
            let visitorTeam = game.gameSchedule.visitorDisplayName;
            let homeTeamData = colors.find(homeTeam);
            let visitorTeamData = colors.find(visitorTeam);
            
            let homeTeamBackground = homeTeamData.colors.hex;
            let visitorTeamBackground = visitorTeamData.colors.hex;
            
            el = document.createElement('li');
            el.innerHTML = window.game(homeTeam, visitorTeam,homeTeamBackground,visitorTeamBackground);
            grid.append(el)

        });
        */
    })
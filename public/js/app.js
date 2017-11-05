// https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIA.svg
const grid = document.querySelector('.grid');
const apiUrl = 'https://feeds.nfl.com/feeds-rs/scores.json';
const colors = new Colors();

function game(homeTeam, visitorTeam, homeTeamBackground, visitorTeamBackground) {
    return `<div class="game">
                <div class="team home" style="background: linear-gradient(to left, #${homeTeamBackground[0]} 10%, #${homeTeamBackground[0]} 90%)">
                
                    <div>${wrapWords(homeTeam)}</div>
                
                </div>
                <div class="team visitor" style="background: linear-gradient(to left, #${visitorTeamBackground[0]} 10%, #${visitorTeamBackground[0]} 90%)">
                    <div>${wrapWords(visitorTeam)}</div>
                </div>
            </div>`;
}


function week(week){
    return `
                <div class="item week-marker">
                    <p class="week"><span class="block">Week</span> <span class="block">${inWords(week)}</span></p>
                </div>
        `;
}

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
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


fetch(apiUrl)
    .then(blob => blob.json())
    .then(data => {
        let el = document.createElement('li');
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
    })

const botlist = document.getElementById('botlist')


get_all_data()


function clear_list(row) {
    row.remove();
}

function get_all_data() {
    db.collection('bots')
    .onSnapshot((snapshot) => {
        try {
            clear_list(document.getElementById("data"))
        } catch (error){
            console.log("No list yet, " + error);
        }
        snapshot.docs.forEach(doc => {
            renderBots(doc)
        });
    })
}

function counter(startTime, el) {
    startTime += 1;
    // return ("VOR " + startTime + " SEK")
    el.textContent = "VOR " + startTime + " SEK"

}



// Function zum anzeigen
function renderBots(doc) {
    
    let tr = document.createElement('tr')
    let name = document.createElement('td')
    let status = document.createElement('td')
    let vor = document.createElement('td')
    let last_status = document.createElement('td')

    tr.setAttribute('data-id', doc.id)
    tr.setAttribute('id', 'data')
    tr.setAttribute('onClick', "window.location='" + doc.id + ".html'")
    // tr.setAttribute('onClick', "window.location='error.html'")
    vor.setAttribute('id', 'time-counter')


    name.textContent = doc.data().id.toUpperCase()+" / "+doc.data().name.toUpperCase()
    status.textContent = doc.data().status.toUpperCase()
    counter(getVorTime(doc.data().last_state), vor)
    last_status.textContent = doc.data().last_state

    if(is_inactive_activeness(doc.data().last_state)) {
        name.style.color = "#ff0d00"
        status.style.color = "#ff0d00"
        vor.style.color = "#ff0d00"
        last_status.style.color = "#ff0d00"
    } else {
        name.style.color = "#0afa2e"
        status.style.color = "#0afa2e"
        vor.style.color = "#0afa2e"
        last_status.style.color = "#0afa2e"
    }

    tr.appendChild(name)
    tr.appendChild(status)
    tr.appendChild(vor)
    tr.appendChild(last_status)


    botlist.append(tr)

    setInterval(function() {counter(getVorTime(doc.data().last_state), vor)}, 2000)

};

function getVorTime(time) {
    var today = new Date();
    const dt_sections= time.split(',');
    const date_sections = dt_sections[0].split('.')
    day = date_sections[0].trim()
    month = date_sections[1].trim()
    year = date_sections[2].trim()
    const time_sections = dt_sections[1].split(':');
    hour = time_sections[0].trim()
    minute = time_sections[1].trim()
    second = time_sections[2].trim()

    // 01.01.2022, 00:00:00
    ls_dt = new Date(year, parseInt(month)-1, day, hour, minute, second, 0);

    var dif = ls_dt.getTime() - today.getTime();
    var seconds_dif = dif / 1000;
    var seconds = Math.abs(seconds_dif);
    return parseInt(seconds)
}

function is_inactive_activeness(time) {
    var today = new Date();
    const dt_sections= time.split(',');
    const date_sections = dt_sections[0].split('.')
    day = date_sections[0].trim()
    month = date_sections[1].trim()
    year = date_sections[2].trim()
    const time_sections = dt_sections[1].split(':');
    hour = time_sections[0].trim()
    minute = time_sections[1].trim()
    second = time_sections[2].trim()

    // 01.01.2022, 00:00:00
    ls_dt = new Date(year, parseInt(month)-1, day, hour, minute, second, 0);

    var dif = ls_dt.getTime() - today.getTime();
    var seconds_dif = dif / 1000;
    var seconds = Math.abs(seconds_dif);
    if (seconds > 90) {
        return true
    } else {
        return false
    }
    
}
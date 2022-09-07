
const botlist = document.getElementById('botlist')

db.collection('bots').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {



        renderBots(doc);
    });
})

// Function zum anzeigen
function renderBots(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let status = document.createElement('span')
    let last_status = document.createElement('span')

    li.setAttribute('data-id', doc.id)


    name.textContent = doc.data().name.toUpperCase()
    status.textContent = doc.data().status.toUpperCase()
    last_status.textContent = doc.data().last_state

    if(is_inactive_activeness(doc.data().last_state)) {
        name.style.color = "red"
        status.style.color = "red"
        last_status.style.color = "red"
    } else {
        name.style.color = "green"
        status.style.color = "green"
        last_status.style.color = "green"
    }

    console.log(name, status, last_status)

    li.appendChild(name)
    li.appendChild(status)
    li.appendChild(last_status)

    botlist.append(li)

};

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
    if (seconds > 30) {
        return true
    } else {
        return false
    }
    
}
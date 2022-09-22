const botlist = document.getElementById('botlist')

get_all_data()


function clear_list(row) {
    row.remove();
}

function get_all_data() {
    db.collection("bots").doc("xtract")
    .onSnapshot((doc) => {
        renderBots(doc)
    });
}


// Function zum anzeigen
function renderBots(doc) {


    bot_name = document.getElementById("botname")
    last_state = document.getElementById("last_state")
    state = document.getElementById("state")
    log = document.getElementById("log")
    time_active = document.getElementById("time_active")

    if (is_inactive_activeness(doc.data().last_state)) {
        bot_name.style.color = "#ff0d00"
        last_state.style.color = "#ff0d00"
    }
    else {
        bot_name.style.color = "#0afa2e"
        last_state.style.color = "#0afa2e"
    }

    bot_name.textContent = doc.data().name
    last_state.textContent = doc.data().last_state
    state.textContent = doc.data().status
    log.textContent = doc.data().log
    time_active.textContent = doc.data().started
    
}


function is_inactive_activeness(time) {
    console.log(time)
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
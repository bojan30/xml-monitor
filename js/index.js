//number html element
const numberContainer = document.getElementById("number");

//url and interval
const xmlServerURL = 'status.xml';
const timeInterval = 1000 * 60;

//function to fetch the data
const fetchData = (url) => {
    fetch(url)
    .then(res => res.text())
    .then(data => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, 'application/xml');
        let gauge = xml.getElementsByName('msgs_in_work_queue')[0];
        const gaugeValue = gauge.getAttribute("current");
        populate(gaugeValue);
        setNumberColor(gaugeValue);
    });
}

//display data on the page
const populate = (gaugeValue) => {
    numberContainer.textContent = gaugeValue;
}

//set the color of a number
const setNumberColor = (gaugeValue) => {
    if(gaugeValue <= 2000){
        numberContainer.className = "green";
    }
    else if(gaugeValue >= 2001 && gaugeValue <= 5000){
        numberContainer.className = "yellow";
    }
    else {
        numberContainer.className = "red";
    }
}

//fetch xml data when on window load
window.addEventListener("load", fetchData(xmlServerURL));

//refetch data every 60 seconds
window.setInterval(() => {
    fetchData(xmlServerURL);
}, timeInterval);


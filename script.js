document.querySelector('.button').addEventListener('click', moonPhase)

const APIKEY = '719bc2b88ad24ccaa5ec26075c04cb03'

function moonPhase() {

    let city = document.querySelector('.city').value
    let state = document.querySelector('.state').value
    let country = document.querySelector('.country').value
    let inputDate = document.querySelector('.date').value

    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${APIKEY}&location=${city},${state},${country}&date=${inputDate}`)
        .then(res => res.json())
        .then(data => {

            const authString = btoa(`8e30474f-c271-4745-91ba-a0a69410f981:dcc4271ea3a2364d4f54028d4ff23feb55483f0aa424914c3572d82d2015ae54f717d8ef69dbbd9c6dc4dde5428c05358390a963d991ef43df466d8b4a1812d8e5d36a1007bf00efaaff5444147c17405feb53e1dce18bdc57a22882564ce1e34edf66ac464513a8fdde071425893ad6`);

            fetch(`https://api.astronomyapi.com/api/v2/studio/moon-phase`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${authString}`,
                },
                body: JSON.stringify({
                    observer: { latitude: parseFloat(data.location.latitude), longitude: parseFloat(data.location.longitude), date: data.date },
                    view: { type: "portrait-simple", orientation: "south-up" },
                    format: "png", style: {
                        "moonStyle": "sketch", backgroundStyle: "stars", backgroundColor: "red", headingColor: "white", textColor: "red"
                    },

                }),
            })
                .then(res => res.json())
                .then(data2 => {
                    console.log(data2)
                    document.querySelector('.moonphoto').src = data2.data.imageUrl
                })


                .catch(err => {
                    console.error(`error ${err}`)
                })
        })
}

//Application Id
//8e30474f-c271-4745-91ba-a0a69410f981

//Application Secret
//dcc4271ea3a2364d4f54028d4ff23feb55483f0aa424914c3572d82d2015ae54f717d8ef69dbbd9c6dc4dde5428c05358390a963d991ef43df466d8b4a1812d8e5d36a1007bf00efaaff5444147c17405feb53e1dce18bdc57a22882564ce1e34edf66ac464513a8fdde071425893ad6
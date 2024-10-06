// Function to handle the download
function downloadImage(imageSrc, imageName) {
    const getObj = async () => {
        try {
            const resp = await fetch(imageSrc)

            if (!resp.ok) {
                throw new Error(resp.err)
            }

            const blob = await resp.blob()
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = imageName;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);

        } catch (err) {
            console.log(err);
        }
    }

    getObj()
}

function handleDownloadClick(event, imageSrc, imageName) {
    event.preventDefault()
    downloadImage(imageSrc, imageName);
}

async function reqPexel(category, page) {
    try {
        const resp = await fetch(`https://api.pexels.com/v1/search?query=${category}&page=${page}`, {
            headers: {
                "Authorization": "bdsQAzRv9zIDLnGXjrm27gjIuiOxmZuEIDSTHco2oEqyWJvgOjrvMqBu",
            }
        })

        if (!resp.ok) {
            throw new Error(resp.err)
        }

        let json = await resp.json()

        return json

    } catch (err) {
        console.log(err);
    }
}

const mainElem = document.querySelector("main")

async function getWall(category) {
    try {
        let json = await reqPexel(category, '')

        const pages = Math.floor(json.total_results / json.per_page)
        const page = Math.floor(Math.random() * pages) + 1;

        json = await reqPexel(category, page)

        let wallStr = ""

        const photos = json.photos

        for (const photo of photos) {
            wallStr += `<div class="wallpaper">
                            <img src="${photo.src.medium}" alt="Nature Wallpaper">
                            <button class="download-btn"
                                onclick="handleDownloadClick(event, '${photo.src.original}', '${photo.alt}')">Download</button>
                        </div>`
        }

        mainElem.innerHTML += `<section id="${category}" class="category">
                                    <h2>${category}</h2>
                                    <div class="wallpapers">
                                        ${wallStr}
                                    </div>
                                </section>`
    } catch (err) {
        console.log(err);
    }
}

let key = null

async function loadKey() {
    try {
        const resp = await fetch("./key.json")

        if (!resp.ok) {
            return new Error(resp.err)
        }

        let json = await resp.json()
        key = json.key

    } catch (err) {
        console.log(err);
    }
}

loadKey().then(() => {
    const catgList = ["nature", "abstract", "travels", "animals", "sports", "galaxy"]

    for (const i of catgList) {
        getWall(i)
    }
})

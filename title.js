var i = 0, titleText = [
        "dread", "drea", "dre", "dr", "d",
        "dr", "dre", "drea", "dread"
];

if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", loaded());
} else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", loaded());
}

function loaded() {
        setInterval(() => {
                document.getElementsByTagName("title")[0]
                        .innerHTML = titleText[i++ % titleText.length];
        }, 300);
}

const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

const colors = ['#ffeae0', '#fff5f0', '#fff1e6', '#fce7f3', '#e6f4ea'];

let colorIndex = 0;

changeBackgroundBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = colors[colorIndex];

    colorIndex++;

    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }
});

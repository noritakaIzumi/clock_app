(() => {
    // Ref: http://yomotsu.net/blog/2013/01/05/fps.html
    // noinspection JSUnresolvedVariable
    const now = window.performance && (
        performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow
    );
    const getTime = function () {
        return (now && now.call(performance)) || (new Date().getTime());
    };

    const clock = document.getElementById('clock');
    const updateClock = () => {
        // そんなに高精細である必要はないのでふつうに new Date で取得している
        const dateObj = new Date();

        const year = dateObj.getFullYear();
        const month = `0${dateObj.getMonth() + 1}`.slice(-2);
        const date = `0${dateObj.getDate()}`.slice(-2);
        const hour = `0${dateObj.getHours()}`.slice(-2);
        const minute = `0${dateObj.getMinutes()}`.slice(-2);
        const second = `0${dateObj.getSeconds()}`.slice(-2);

        clock.innerText = `${year}/${month}/${date}\n${hour}:${minute}:${second}`;
    };

    let startTime = getTime();
    const interval = 10; // milliseconds
    const loop = () => {
        const currentTime = getTime();
        if (currentTime - startTime >= interval) {
            updateClock.call();
            startTime = getTime();
        }
        requestAnimationFrame(loop);
    };
    updateClock();
    loop();
})();

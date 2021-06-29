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

    const saveWindowPosition = () => {
        const windowPosition = [window.screenX, window.screenY];
        localStorage.setItem('windowPosition', JSON.stringify(windowPosition));
    };

    let time1 = getTime();
    let time2 = getTime();
    const interval1 = 10; // milliseconds
    const interval2 = 1000; // milliseconds
    const loop = () => {
        const currentTime = getTime();
        if (currentTime - time1 >= interval1) {
            updateClock.call();
            time1 = getTime();
        }
        if (currentTime - time2 >= interval2) {
            saveWindowPosition.call();
            time2 = getTime();
        }
        requestAnimationFrame(loop);
    };
    updateClock();
    loop();
})();

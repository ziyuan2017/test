/*
	随屏幕窗口调整,自动调整页面比例功能
	-------------------------------

	@width 设计图宽度
*/

export default function remLayout(width) {
    function init(event) {

        var fontSize = window.innerWidth / width * 100

        document.documentElement.style.fontSize = fontSize + 'px'
        document.documentElement.classList.add('devicePR' + window.devicePixelRatio)
        document.body.style.height = `${document.body.clientHeight}px`
    }

    init()

    window.addEventListener('resize', init, false)

    document.addEventListener('click', function(event) {
        let target = event.target,
            targetName = target.tagName.toLowerCase();
        if (['input', 'textarea'].indexOf(targetName) !== -1) {
            if (['checkbox', 'radio'].indexOf(target.type) === -1) {
                setTimeout(() => {
                    if (target.getBoundingClientRect().top + 50 > window.innerHeight) {
                        target.scrollIntoView()
                    } else {
                        target.scrollIntoViewIfNeeded();
                    }
                }, 200)
            }
        }
    }, false);
}
var dmPreloaderText = '';
var dmPreloaderTextArr = [
    'А&nbsp;цены&nbsp;на&nbsp;вылеты&nbsp;18&nbsp;июня<br/>в Измир СНИЖЕНЫ',
    'А&nbsp;вы&nbsp;можете&nbsp;использовать<br/>фильтры&nbsp;для&nbsp;оптимального<br/>поиска',
    'А&nbsp;ПЦР&nbsp;на&nbsp;вылет&nbsp;в&nbsp;Турцию<br/>уже&nbsp;не&nbsp;нужен',
    'А&nbsp;самый&nbsp;комфортный&nbsp;отдых<br/>с&nbsp;детьми&nbsp;в&nbsp;отеле&nbsp;Xanadu',
];
dmPreloaderText = dmPreloaderTextArr[Math.floor(Math.random()*dmPreloaderTextArr.length)];
var dmPreloader = `<div class="dm-preloader__wrap">
                        <div class="dm-preloader"></div>
                        <div class="dm-preloader__title">Идет загрузка...</div>
                        <div class="dm-preloader__text">${dmPreloaderText}</div>
                    </div>`;
var $dmel = document.querySelector('.travelloader .loader');
$dmel.innerHTML = dmPreloader;
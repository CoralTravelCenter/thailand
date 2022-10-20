document.addEventListener('DOMContentLoaded', function(){
    
    function InsertEndBody(html){
        var $body = $('body');
        $body.append( html );
    }

    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    function getCredit(prices){
        var arr1 = prices;
        var arr2 = [];
        arr1.each(function(){
            var $this = $(this);
            var $num = $this.text().trim();
            var $order = $this.css('order');
            var $width = $this.width();
            
            if( $width > 1 && $order < 20 ){
                var number= {
                    order : $order,
                    num: $num,
                };
                arr2.push( number );
            }
        });
        arr2.sort(byField('order'));
        var price = '';
        for (var i = 0; i < arr2.length; i++){
            price = price + arr2[i].num.toString();
        }

        var creditPrice = 0;
        creditPrice = Math.ceil( price / 36 * 11.5 );
        creditPrice = creditPrice.toLocaleString();
        return creditPrice;
    }

    function SetPopupPosition ( elem ){

        var $elem = $(elem); // блок с кредитом
        var offset = $elem.offset();

        var $elemTop = offset.top;
        var $elemLeft = offset.left;
        var $elemWidth = $elem.width();
        var $elemHeight = $elem.height();        


        var $popup = $('.dm-credit__popup'); // блок с popup
        var $popupHeight = $popup.height();
        var $popupWidth = $popup.width();

        var winWidth = window.innerWidth;
        var $top = 0;
        var $left = 0;

        if( $elemLeft + $elemWidth + $popupWidth < winWidth - 10 ){
            $left = $elemLeft + $elemWidth;
        }
        else{
            $left = winWidth - 10;
        }

        $top = $elemTop - $popupHeight + ( $elemHeight / 2 );
        
        $popup.css({
                top : $top,
                left : $left,
            })
            .fadeIn(200);
    }

    // var html = $('.dm-credit__popup');

    var htmlPopup = `<div class="dm-credit__popup">
    <div class="dm-credit__popup-body">
      <svg class="dm-credit__popup-img">
        <use xlink:href="#dm-halva" height="10em"></use>
      </svg><br><b>Рассрочка по&nbsp;карте «Халва»</b><br>3 месяца и 12 месяцев<br>для новых пользователей
    </div>
    <div class="dm-credit__popup-body">
      <svg class="dm-credit__popup-img dm-credit__popup-img--sber">
        <use xlink:href="#dm-sber" height="2em"></use>
      </svg><br><b>Кредит от Сбера</b><br>от 3-х до 36 месяцев<br>без первоначального взноса<br>минимальная переплата<br>сумма кредита от 3 000 до 300 000 ₽
    </div>
    <div class="dm-credit__popup-note">*рассрочка и кредит рассчитываются<br>индивидуально банком-партнером</div>
  </div>`;
    var htmlCredit = `<div class="dm-credit__wrap">
    <div class="dm-credit">
      <div class="dm-credit__left">
        <div class="dm-credit__img-wrap">
          <svg class="dm-credit__img">
            <use xlink:href="#dm-icon"></use>
          </svg>
          <svg class="dm-credit__img--list">
            <use xlink:href="#dm-icon--list"></use>
          </svg>
        </div>
      </div>
      <div class="dm-credit__right">
        <div class="dm-credit__body">Доступно в рассрочку и кредит<br>от <b class="dm-credit__yellow-color"><span class="dm-credit__price">14 394</span> ₽</b> в месяц</div>
      </div>
    </div>
  </div>`;
    var htmlSvg = `<svg height="0">
    <g id="dm-halva">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4206 7.60192C13.9872 7.60305 13.5633 7.4761 13.2025 7.23711C12.8417 6.99811 12.5602 6.65782 12.3936 6.25935C12.227 5.86087 12.1828 5.42212 12.2667 4.99863C12.3505 4.57514 12.5586 4.18593 12.8645 3.88031C13.1705 3.57469 13.5606 3.36637 13.9855 3.28174C14.4104 3.19711 14.851 3.23998 15.2513 3.4049C15.6518 3.56982 15.9941 3.8494 16.235 4.20824C16.4757 4.56707 16.6043 4.98901 16.6043 5.42066C16.6048 5.9983 16.3749 6.55248 15.9654 6.96148C15.556 7.37044 15.0004 7.6008 14.4206 7.60192ZM14.4206 0.920787C13.6607 0.919105 12.9127 1.10841 12.2457 1.47119C11.5788 1.83397 11.0146 2.3585 10.6052 2.99622C10.1958 3.63394 9.95453 4.36425 9.90368 5.11954C9.85279 5.87482 9.99404 6.63069 10.3143 7.31716C10.6345 8.00368 11.1234 8.59853 11.7357 9.04682C12.348 9.49507 13.0639 9.78221 13.8172 9.88166C14.5704 9.98107 15.3367 9.88958 16.0451 9.61567C16.7534 9.34171 17.3809 8.89418 17.8696 8.31449C17.5712 8.86718 17.1398 9.33037 16.6401 9.62143V9.85376H18.9262V5.39732C18.9209 4.20963 18.4439 3.0723 17.5998 2.23361C16.7556 1.39492 15.6127 0.922973 14.4206 0.920787ZM36.0996 7.6458H33.1261V6.18532H36.0434C36.4081 6.18532 36.8337 6.5271 36.8337 6.91558C36.8337 7.19737 36.6125 7.6458 36.0996 7.6458ZM33.1261 3.19925L35.6235 3.19815C35.8943 3.19815 36.3413 3.47665 36.3413 3.92206C36.3413 4.27751 36.0519 4.65985 35.5485 4.65985H33.1261V3.19925ZM38.131 5.15149C38.6733 4.33021 38.7232 3.20794 38.2277 2.36834C37.9823 1.95305 37.6332 1.60821 37.2142 1.36746C36.7951 1.12671 36.3206 0.998282 35.8368 0.994701L30.8398 0.994179V9.85376L36.4312 9.85012C38.1852 9.85012 39.1641 8.40805 39.1641 7.198C39.1641 6.03372 38.4994 5.44989 38.131 5.15149ZM28.5789 4.25891C29.3292 6.27577 29.3675 8.10561 29.3675 9.8539H27.0466C27.0466 8.43577 26.9967 7.1445 26.6987 5.97715C26.2994 4.41235 25.5559 3.2748 24.865 3.27474C24.174 3.27468 23.4299 4.41235 23.0306 5.97715C22.7326 7.1445 22.6833 8.40211 22.6833 9.8539H20.3624C20.3624 8.26284 20.4001 6.27577 21.1506 4.25891C21.8499 2.37997 23.1567 0.920944 24.865 0.920944C26.5732 0.920944 27.8795 2.37997 28.5789 4.25891ZM6.69005 0.994074H9.01151V1.92732C9.01219 2.59734 8.86252 3.25905 8.57353 3.86404C8.28454 4.46905 7.86343 5.00206 7.34111 5.4241C7.86343 5.84616 8.28454 6.37918 8.57353 6.98421C8.86252 7.58923 9.01219 8.25091 9.01151 8.92091V9.85417H6.69005V8.68718C6.69005 8.1101 6.45997 7.5567 6.05038 7.14868C5.64079 6.74062 5.08527 6.51139 4.50603 6.51139C3.92678 6.51139 3.37126 6.74062 2.96167 7.14868C2.55208 7.5567 2.32197 8.1101 2.32197 8.68718V9.85376H1.79782e-06V8.92051C-0.000576053 8.25046 0.14916 7.58874 0.438259 6.98371C0.727357 6.37873 1.14852 5.84571 1.67095 5.4237C1.1485 5.0017 0.72733 4.4687 0.438228 3.8637C0.149126 3.25869 -0.000598472 2.59697 1.79782e-06 1.9269V0.993917H2.32197V2.16048C2.32197 2.73754 2.55208 3.29096 2.96167 3.699C3.37126 4.10706 3.92678 4.33629 4.50603 4.33629C5.08527 4.33629 5.64079 4.10706 6.05038 3.699C6.45997 3.29096 6.69005 2.73754 6.69005 2.16048V0.994074ZM44.5442 7.60206C44.1109 7.60323 43.687 7.47624 43.3262 7.23724C42.9654 6.99825 42.6839 6.658 42.5173 6.25953C42.3508 5.86105 42.3065 5.4223 42.3903 4.99879C42.4742 4.5753 42.6822 4.18609 42.9882 3.88046C43.2941 3.57485 43.6843 3.36652 44.1092 3.2819C44.5341 3.19727 44.9746 3.24013 45.3748 3.40506C45.7753 3.57 46.1178 3.84956 46.3585 4.20839C46.5993 4.56722 46.728 4.98916 46.728 5.42082C46.7284 5.99848 46.4985 6.5527 46.0894 6.96171C45.6799 7.37071 45.1242 7.60102 44.5442 7.60206ZM49.0495 5.39747C49.0432 4.34141 48.6639 3.32121 47.9785 2.5157C47.2927 1.71018 46.3446 1.17073 45.3001 0.991907C44.2552 0.813082 43.1805 1.00629 42.2644 1.53766C41.3483 2.06903 40.6491 2.90467 40.2895 3.8981C39.9298 4.89155 39.9326 5.9794 40.2973 6.97102C40.662 7.96264 41.3654 8.79473 42.2842 9.32146C43.203 9.84823 44.2785 10.036 45.3226 9.85192C46.3662 9.66782 47.3121 9.12359 47.9934 8.31463C47.695 8.86732 47.2635 9.33055 46.7635 9.62161V9.8539H49.05V5.39732L49.0495 5.39747Z" fill="#F04E53"></path>
    </g>
    <g id="dm-icon">
    <path d="M45.5425 26.9224L43.9098 29.7248C43.5049 30.4211 43.2254 31.1816 43.0836 31.9725L42.5132 35.1543C42.2984 36.3526 41.7693 37.4741 40.9787 38.4064C40.1881 39.3388 39.1639 40.0493 38.0085 40.467L34.9398 41.5761C34.1771 41.8529 33.4683 42.2577 32.8448 42.7729L30.3368 44.8456C29.3952 45.6232 28.2644 46.1436 27.0566 46.3552C25.8489 46.5669 24.6062 46.4625 23.4519 46.0521L20.3832 44.9525C19.62 44.6787 18.8148 44.5372 18.003 44.5341L14.7278 44.5341C13.4981 44.528 12.2913 44.2041 11.227 43.5949C10.1626 42.9856 9.2775 42.112 8.65924 41.0604L7.0265 38.2679C6.61885 37.5742 6.0931 36.9552 5.47247 36.4385L2.97426 34.3564C2.03182 33.5731 1.31406 32.5585 0.892856 31.4143C0.471655 30.2701 0.361805 29.0366 0.574389 27.8372L1.13502 24.6554C1.27266 23.8633 1.27266 23.0539 1.13502 22.2618L0.574389 19.08C0.361806 17.8806 0.471655 16.6469 0.892856 15.5027C1.31406 14.3585 2.03182 13.3438 2.97427 12.5606L5.47247 10.4784C6.09091 9.95957 6.61632 9.34122 7.0265 8.64924L8.65924 5.84681C9.27648 4.79507 10.1616 3.9218 11.2264 3.31401C12.2912 2.70622 13.4984 2.38508 14.7278 2.3828L18.003 2.3828C18.8143 2.38303 19.6195 2.24486 20.3832 1.97421L23.4519 0.874573C24.6053 0.462928 25.8475 0.357 27.0553 0.566941C28.263 0.776882 29.3942 1.29561 30.3368 2.07161L32.8448 4.15377C33.4687 4.66598 34.1775 5.06756 34.9398 5.34083L38.0085 6.45994C39.1626 6.87677 40.1861 7.58566 40.9765 8.51621C41.767 9.44676 42.2968 10.5663 42.5132 11.7629L43.0836 14.9544C43.2254 15.7453 43.5049 16.5056 43.9098 17.2019L45.5425 20.0043C46.1496 21.0582 46.4689 22.2503 46.4689 23.4633C46.4689 24.6764 46.1496 25.8685 45.5425 26.9224Z" fill="url(#paint0_linear_290_1096)"></path>
    <path d="M13.4975 34.0001C13.0375 34.0001 12.8075 33.8001 12.8075 33.4001C12.8075 33.2801 12.8475 33.1701 12.9275 33.0701L27.7175 13.5701C27.8575 13.3901 27.9975 13.2501 28.1375 13.1501C28.2975 13.0501 28.5175 13.0001 28.7975 13.0001H31.4375C31.8975 13.0001 32.1275 13.2001 32.1275 13.6001C32.1275 13.7201 32.0875 13.8301 32.0075 13.9301L17.1875 33.4301C17.0475 33.6101 16.9075 33.7501 16.7675 33.8501C16.6275 33.9501 16.4175 34.0001 16.1375 34.0001H13.4975ZM29.1875 34.1501C27.8075 34.1501 26.6875 33.7901 25.8275 33.0701C24.9875 32.3501 24.5275 31.3901 24.4475 30.1901C24.4075 29.6701 24.3875 29.2101 24.3875 28.8101C24.4075 28.3901 24.4275 27.9001 24.4475 27.3401C24.5275 26.1201 24.9675 25.1501 25.7675 24.4301C26.5875 23.7101 27.7275 23.3501 29.1875 23.3501C30.6475 23.3501 31.7775 23.7101 32.5775 24.4301C33.3975 25.1501 33.8375 26.1201 33.8975 27.3401C33.9375 27.9001 33.9575 28.3901 33.9575 28.8101C33.9575 29.2101 33.9375 29.6701 33.8975 30.1901C33.8375 31.3901 33.3775 32.3501 32.5175 33.0701C31.6775 33.7901 30.5675 34.1501 29.1875 34.1501ZM29.1875 31.2101C29.4475 31.2101 29.6475 31.1601 29.7875 31.0601C29.9275 30.9401 30.0375 30.7901 30.1175 30.6101C30.1975 30.4101 30.2375 30.2101 30.2375 30.0101C30.2775 29.5901 30.2975 29.1701 30.2975 28.7501C30.2975 28.3301 30.2775 27.9201 30.2375 27.5201C30.2175 27.2001 30.1275 26.9201 29.9675 26.6801C29.8075 26.4401 29.5475 26.3201 29.1875 26.3201C28.8075 26.3201 28.5375 26.4401 28.3775 26.6801C28.2175 26.9201 28.1275 27.2001 28.1075 27.5201C28.0875 27.9201 28.0775 28.3301 28.0775 28.7501C28.0775 29.1701 28.0875 29.5901 28.1075 30.0101C28.1275 30.2101 28.1675 30.4101 28.2275 30.6101C28.3075 30.7901 28.4175 30.9401 28.5575 31.0601C28.7175 31.1601 28.9275 31.2101 29.1875 31.2101ZM15.8375 23.6201C14.4575 23.6201 13.3375 23.2701 12.4775 22.5701C11.6375 21.8501 11.1775 20.8901 11.0975 19.6901C11.0575 19.1701 11.0375 18.7101 11.0375 18.3101C11.0575 17.8901 11.0775 17.4001 11.0975 16.8401C11.1775 15.6201 11.6175 14.6501 12.4175 13.9301C13.2375 13.2101 14.3775 12.8501 15.8375 12.8501C17.2975 12.8501 18.4275 13.2101 19.2275 13.9301C20.0475 14.6501 20.4975 15.6201 20.5775 16.8401C20.6175 17.4001 20.6375 17.8901 20.6375 18.3101C20.6375 18.7101 20.6175 19.1701 20.5775 19.6901C20.4975 20.8901 20.0275 21.8501 19.1675 22.5701C18.3275 23.2701 17.2175 23.6201 15.8375 23.6201ZM15.8375 20.7101C16.0975 20.7101 16.2975 20.6601 16.4375 20.5601C16.5775 20.4401 16.6875 20.2901 16.7675 20.1101C16.8475 19.9101 16.8875 19.7101 16.8875 19.5101C16.9275 19.0901 16.9475 18.6701 16.9475 18.2501C16.9475 17.8301 16.9275 17.4201 16.8875 17.0201C16.8675 16.7001 16.7775 16.4201 16.6175 16.1801C16.4775 15.9401 16.2175 15.8201 15.8375 15.8201C15.4575 15.8201 15.1875 15.9401 15.0275 16.1801C14.8675 16.4201 14.7775 16.7001 14.7575 17.0201C14.7375 17.4201 14.7275 17.8301 14.7275 18.2501C14.7275 18.6701 14.7375 19.0901 14.7575 19.5101C14.7775 19.7101 14.8175 19.9101 14.8775 20.1101C14.9575 20.2901 15.0775 20.4401 15.2375 20.5601C15.3975 20.6601 15.5975 20.7101 15.8375 20.7101Z" fill="white"></path>
    <defs>
    <linearGradient id="paint0_linear_290_1096" x1="46.4689" y1="23.4619" x2="0.468871" y2="23.4619" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FC790F"></stop>
    <stop offset="1" stop-color="#F8C33F"></stop>
    </linearGradient>
    </defs>
    </g>
    <g id="dm-sber">
    <path d="M38.8454 4.94494L40.6582 3.59473H34.5891V11.6828H40.6582V10.3326H36.3231V8.26753H40.0277V6.91732H36.3231V4.94494H38.8454Z" fill="#21A038"></path>
    <path d="M30.0043 6.74523H27.9024V4.94494H31.2654L33.0783 3.59473H26.1683V11.6828H29.7809C31.804 11.6828 32.9731 10.7562 32.9731 9.1412C32.9731 7.59242 31.9222 6.74523 30.0043 6.74523ZM29.7152 10.3326H27.9024V8.09545H29.7152C30.8188 8.09545 31.3311 8.46609 31.3311 9.22063C31.3311 9.97518 30.7793 10.3326 29.7152 10.3326Z" fill="#21A038"></path>
    <path d="M45.5713 3.59473H42.274V11.6828H44.008V9.39269H45.5845C47.6863 9.39269 49 8.28077 49 6.49372C49 4.70666 47.6863 3.59473 45.5713 3.59473ZM45.5319 8.0425H43.9949V4.94494H45.5319C46.6486 4.94494 47.2528 5.50091 47.2528 6.49372C47.2528 7.48653 46.6486 8.0425 45.5319 8.0425Z" fill="#21A038"></path>
    <path d="M23.1995 9.93545C22.7398 10.187 22.2274 10.3194 21.7019 10.3194C20.1386 10.3194 19.0089 9.19419 19.0089 7.64542C19.0089 6.09663 20.1386 4.97146 21.7019 4.97146C22.2668 4.95822 22.8185 5.14354 23.2783 5.47448L24.5263 4.54785L24.4475 4.46843C23.725 3.81979 22.7528 3.48886 21.6494 3.48886C20.4539 3.48886 19.3636 3.89922 18.5754 4.64052C17.7871 5.40829 17.3405 6.48052 17.3668 7.59246C17.3537 8.71765 17.7871 9.80315 18.5754 10.5973C19.403 11.3784 20.5064 11.8152 21.6362 11.7887C22.8842 11.7887 23.9746 11.3519 24.7102 10.5576L23.5936 9.7237L23.1995 9.93545Z" fill="#21A038"></path>
    <path d="M11.9413 3.54179C12.2565 3.95216 12.5193 4.40223 12.7426 4.87878L6.67347 9.39271L4.12494 7.77777V5.84511L6.66033 7.44683L11.9413 3.54179Z" fill="#21A038"></path>
    <path d="M1.537 7.64543C1.537 7.55277 1.537 7.47334 1.55014 7.38068L0.0131367 7.30125C0.0131367 7.40716 0 7.52629 0 7.63219C0 9.48545 0.748794 11.1666 1.95737 12.3844L3.04772 11.2857C2.11501 10.3591 1.537 9.07507 1.537 7.64543Z" fill="url(#paint0_linear_290_1128)"></path>
    <path d="M6.66035 2.48277C6.7523 2.48277 6.83113 2.48277 6.92308 2.49601L7.0019 0.947228C6.89681 0.947228 6.77858 0.93399 6.67348 0.93399C4.83434 0.93399 3.16598 1.68852 1.9574 2.90637L3.04775 4.00507C3.96731 3.06522 5.25472 2.48277 6.66035 2.48277Z" fill="url(#paint1_linear_290_1128)"></path>
    <path d="M6.66034 12.808C6.56839 12.808 6.48956 12.808 6.3976 12.7947L6.31879 14.3436C6.42388 14.3436 6.54211 14.3567 6.6472 14.3567C8.48631 14.3567 10.1547 13.6023 11.3633 12.3844L10.2729 11.2857C9.35335 12.2388 8.0791 12.808 6.66034 12.808Z" fill="url(#paint2_linear_290_1128)"></path>
    <path d="M9.55036 3.38294L10.8509 2.41661C9.70799 1.48999 8.24982 0.920776 6.66028 0.920776V2.46955C7.73749 2.48279 8.73593 2.81372 9.55036 3.38294Z" fill="url(#paint3_linear_290_1128)"></path>
    <path d="M13.3338 7.6454C13.3338 7.23504 13.2944 6.83792 13.2287 6.4408L11.7968 7.51303C11.7968 7.55274 11.7968 7.60569 11.7968 7.6454C11.7968 9.1677 11.1399 10.5312 10.1022 11.471L11.1399 12.6227C12.4799 11.4048 13.3338 9.61781 13.3338 7.6454Z" fill="#21A038"></path>
    <path d="M6.6603 12.8079C5.14958 12.8079 3.79649 12.1461 2.86379 11.1003L1.72089 12.1461C2.9426 13.5095 4.70292 14.3567 6.6603 14.3567V12.8079Z" fill="url(#paint4_linear_290_1128)"></path>
    <path d="M3.23164 3.81978L2.19384 2.66812C0.840753 3.8992 0 5.67302 0 7.6454H1.537C1.537 6.13633 2.19384 4.75964 3.23164 3.81978Z" fill="url(#paint5_linear_290_1128)"></path>
    <defs>
    <linearGradient id="paint0_linear_290_1128" x1="1.79336" y1="12.196" x2="0.224009" y2="7.62489" gradientUnits="userSpaceOnUse">
    <stop offset="0.1444" stop-color="#F2E913"></stop>
    <stop offset="0.3037" stop-color="#E7E518"></stop>
    <stop offset="0.5823" stop-color="#CADB26"></stop>
    <stop offset="0.891" stop-color="#A3CD39"></stop>
    </linearGradient>
    <linearGradient id="paint1_linear_290_1128" x1="2.39552" y1="2.7316" x2="6.37967" y2="1.20167" gradientUnits="userSpaceOnUse">
    <stop offset="0.0592" stop-color="#0FA8E0"></stop>
    <stop offset="0.5385" stop-color="#0099F9"></stop>
    <stop offset="0.9234" stop-color="#0291EB"></stop>
    </linearGradient>
    <linearGradient id="paint2_linear_290_1128" x1="6.22854" y1="13.0396" x2="10.9782" y2="11.9579" gradientUnits="userSpaceOnUse">
    <stop offset="0.1226" stop-color="#A3CD39"></stop>
    <stop offset="0.2846" stop-color="#86C339"></stop>
    <stop offset="0.8693" stop-color="#21A038"></stop>
    </linearGradient>
    <linearGradient id="paint3_linear_290_1128" x1="6.34449" y1="1.90723" x2="10.2935" y2="3.13504" gradientUnits="userSpaceOnUse">
    <stop offset="0.0566" stop-color="#0291EB"></stop>
    <stop offset="0.79" stop-color="#0C8ACB"></stop>
    </linearGradient>
    <linearGradient id="paint4_linear_290_1128" x1="2.11169" y1="12.3914" x2="6.3534" y2="13.9885" gradientUnits="userSpaceOnUse">
    <stop offset="0.1324" stop-color="#F2E913"></stop>
    <stop offset="0.2977" stop-color="#EBE716"></stop>
    <stop offset="0.5306" stop-color="#D9E01F"></stop>
    <stop offset="0.8023" stop-color="#BBD62D"></stop>
    <stop offset="0.9829" stop-color="#A3CD39"></stop>
    </linearGradient>
    <linearGradient id="paint5_linear_290_1128" x1="1.17768" y1="7.83247" x2="2.87429" y2="3.38513" gradientUnits="userSpaceOnUse">
    <stop offset="0.0698" stop-color="#A3CD39"></stop>
    <stop offset="0.2599" stop-color="#81C55F"></stop>
    <stop offset="0.9216" stop-color="#0FA8E0"></stop>
    </linearGradient>
    </defs>
    </g>
    <g id="dm-icon--list">
    <path d="M26.437 15.9377L25.5141 17.5216C25.2853 17.9152 25.1273 18.3451 25.0472 18.7921L24.7247 20.5905C24.6034 21.2678 24.3043 21.9017 23.8574 22.4287C23.4106 22.9556 22.8317 23.3572 22.1786 23.5933L20.4441 24.2202C20.013 24.3766 19.6124 24.6055 19.26 24.8967L17.8424 26.0682C17.3102 26.5077 16.6711 26.8018 15.9884 26.9215C15.3058 27.0411 14.6034 26.9821 13.951 26.7501L12.2165 26.1286C11.7851 25.9738 11.33 25.8939 10.8712 25.8921L9.01994 25.8921C8.3249 25.8886 7.64283 25.7056 7.04123 25.3612C6.43963 25.0169 5.93936 24.5231 5.58991 23.9287L4.66706 22.3504C4.43665 21.9583 4.13949 21.6084 3.78869 21.3164L2.37666 20.1395C1.84397 19.6968 1.43828 19.1233 1.20021 18.4766C0.962145 17.8298 0.900056 17.1327 1.02021 16.4547L1.33709 14.6563C1.41489 14.2086 1.41489 13.7511 1.33709 13.3034L1.02021 11.505C0.900056 10.8271 0.962145 10.1298 1.20021 9.48305C1.43829 8.83633 1.84398 8.26284 2.37666 7.82012L3.7887 6.64324C4.13825 6.34999 4.43522 6.00049 4.66706 5.60937L5.58991 4.02539C5.93878 3.43092 6.43909 2.93734 7.04093 2.59381C7.64277 2.25027 8.32511 2.06876 9.01994 2.06747L10.8712 2.06747C11.3297 2.0676 11.7848 1.9895 12.2165 1.83653L13.951 1.21499C14.6029 0.982324 15.305 0.922451 15.9877 1.04111C16.6703 1.15978 17.3097 1.45297 17.8424 1.89158L19.26 3.06845C19.6127 3.35796 20.0133 3.58494 20.4441 3.7394L22.1786 4.37194C22.831 4.60754 23.4094 5.00822 23.8562 5.53418C24.303 6.06014 24.6025 6.69295 24.7247 7.36924L25.0472 9.17315C25.1273 9.62018 25.2853 10.0499 25.5141 10.4435L26.437 12.0275C26.7801 12.6231 26.9606 13.2969 26.9606 13.9826C26.9606 14.6682 26.7801 15.342 26.437 15.9377Z" fill="url(#paint0_linear_290_1099)"></path>
    <path d="M8.25518 19.5241C7.99776 19.5241 7.86905 19.4134 7.86905 19.192C7.86905 19.1256 7.89144 19.0647 7.93621 19.0094L16.2128 8.2162C16.2911 8.11658 16.3694 8.03909 16.4478 7.98374C16.5373 7.92839 16.6604 7.90071 16.8171 7.90071H18.2945C18.5519 7.90071 18.6806 8.01141 18.6806 8.23281C18.6806 8.29923 18.6582 8.36011 18.6135 8.41546L10.3201 19.2086C10.2418 19.3083 10.1634 19.3857 10.0851 19.4411C10.0067 19.4964 9.88923 19.5241 9.73254 19.5241H8.25518ZM17.0354 19.6071C16.2631 19.6071 15.6364 19.4079 15.1551 19.0094C14.685 18.6108 14.4276 18.0795 14.3828 17.4153C14.3605 17.1275 14.3493 16.8729 14.3493 16.6515C14.3605 16.419 14.3717 16.1478 14.3828 15.8378C14.4276 15.1626 14.6738 14.6257 15.1215 14.2272C15.5804 13.8286 16.2183 13.6294 17.0354 13.6294C17.8524 13.6294 18.4847 13.8286 18.9324 14.2272C19.3913 14.6257 19.6375 15.1626 19.6711 15.8378C19.6935 16.1478 19.7047 16.419 19.7047 16.6515C19.7047 16.8729 19.6935 17.1275 19.6711 17.4153C19.6375 18.0795 19.3801 18.6108 18.8989 19.0094C18.4288 19.4079 17.8076 19.6071 17.0354 19.6071ZM17.0354 17.9799C17.1809 17.9799 17.2928 17.9522 17.3711 17.8968C17.4495 17.8304 17.511 17.7474 17.5558 17.6478C17.6006 17.5371 17.623 17.4264 17.623 17.3157C17.6453 17.0832 17.6565 16.8507 17.6565 16.6183C17.6565 16.3858 17.6453 16.1589 17.623 15.9375C17.6118 15.7603 17.5614 15.6054 17.4719 15.4725C17.3823 15.3397 17.2368 15.2733 17.0354 15.2733C16.8227 15.2733 16.6716 15.3397 16.5821 15.4725C16.4926 15.6054 16.4422 15.7603 16.431 15.9375C16.4198 16.1589 16.4142 16.3858 16.4142 16.6183C16.4142 16.8507 16.4198 17.0832 16.431 17.3157C16.4422 17.4264 16.4646 17.5371 16.4982 17.6478C16.5429 17.7474 16.6045 17.8304 16.6828 17.8968C16.7724 17.9522 16.8899 17.9799 17.0354 17.9799ZM9.56465 13.7788C8.7924 13.7788 8.16564 13.5851 7.68438 13.1977C7.21432 12.7991 6.9569 12.2678 6.91213 11.6036C6.88975 11.3158 6.87856 11.0612 6.87856 10.8398C6.88975 10.6073 6.90094 10.3361 6.91213 10.0261C6.9569 9.35087 7.20313 8.81398 7.65081 8.41546C8.10968 8.01695 8.74763 7.81769 9.56465 7.81769C10.3817 7.81769 11.014 8.01695 11.4617 8.41546C11.9206 8.81398 12.1724 9.35087 12.2172 10.0261C12.2396 10.3361 12.2508 10.6073 12.2508 10.8398C12.2508 11.0612 12.2396 11.3158 12.2172 11.6036C12.1724 12.2678 11.9094 12.7991 11.4281 13.1977C10.9581 13.5851 10.3369 13.7788 9.56465 13.7788ZM9.56465 12.1682C9.71015 12.1682 9.82207 12.1405 9.90042 12.0851C9.97876 12.0187 10.0403 11.9357 10.0851 11.8361C10.1299 11.7254 10.1522 11.6147 10.1522 11.504C10.1746 11.2715 10.1858 11.039 10.1858 10.8066C10.1858 10.5741 10.1746 10.3472 10.1522 10.1258C10.141 9.94865 10.0907 9.79367 10.0011 9.66083C9.9228 9.52799 9.7773 9.46157 9.56465 9.46157C9.352 9.46157 9.20091 9.52799 9.11138 9.66083C9.02184 9.79367 8.97147 9.94865 8.96028 10.1258C8.94909 10.3472 8.94349 10.5741 8.94349 10.8066C8.94349 11.039 8.94909 11.2715 8.96028 11.504C8.97147 11.6147 8.99386 11.7254 9.02744 11.8361C9.0722 11.9357 9.13936 12.0187 9.22889 12.0851C9.31843 12.1405 9.43035 12.1682 9.56465 12.1682Z" fill="white"></path>
    <defs>
    <linearGradient id="paint0_linear_290_1099" x1="26.9606" y1="13.9817" x2="0.960574" y2="13.9817" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FC790F"></stop>
    <stop offset="1" stop-color="#F8C33F"></stop>
    </linearGradient>
    </defs>
    </g>
    </svg>`;

    InsertEndBody(htmlPopup);
    InsertEndBody(htmlSvg);

    var isHotelPage = $('.hoteldetailpage') || false;
    var isHotelListPage = $('.hotellist') || false;

    if( isHotelPage.length ) {
        var hasPrice = $('.priceInnerWrap .price .price-big') || false;
        var $container = $('.noroomavailable .card');

        if ( hasPrice.length && !$container.length ) {
            var insetBeforeElem = '.tripadvisor';
            $(htmlCredit).insertBefore( insetBeforeElem );
            var price = getCredit( $('.priceInnerWrap .price .price-big > *') );
            $('.dm-credit__price').html( price )
        }
    }
    else if ( isHotelListPage.length ){
        var hotels = isHotelListPage.find('.item[data-package-layer]');

        hotels.each(function(){
            var $hotel = $(this);
            var hasPrice = $hotel.find('.action-discount-price > div') || false;
            if ( hasPrice.length ) {
                var insetBeforeElem = 'a.hotellist-actionlink';
                $(htmlCredit).insertBefore( $hotel.find(insetBeforeElem) );
                var price = getCredit( $hotel.find('.action-discount-price > div > *') );
                $hotel.find('.dm-credit__price').html( price )
            }
        });

    }

    if ( $('.dm-credit').length ){
        $('.dm-credit').on(
            {
                mouseenter: function() {
                    if( window.innerWidth > 769 ){
                        SetPopupPosition( this );
                    }
                },
                mouseleave: function() {
                    if( window.innerWidth > 769 ){
                        $('.dm-credit__popup').fadeOut(100);
                    }
                },
                click: function() {
                    if( window.innerWidth <= 769 ){
                        SetPopupPosition( this );
                    }
                },
            }    
        );
    }

    $(document).on('click', function(e){
        if ( !$(e.target).closest('.dm-credit').length ) {
            $('.dm-credit__popup').fadeOut(100);
        };
    });
});


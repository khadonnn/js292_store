const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const range = document.querySelector(".slider .progress");
let priceGap = 2000000;

const updateSlider = (ds, options) => {
    //Sort price increase
    ds.sort((a, b) => {
        return a.Don_gia_Ban - b.Don_gia_Ban
    });
    let min = (ds[0].Don_gia_Ban);
    let max = (ds[ds.length - 1].Don_gia_Ban);
    rangeInput.forEach((input => {
        input.setAttribute("min", min)
        input.setAttribute("max", max)
    }))
    //Setup min/max default according to btnNhom
    const { skipUpdateRange, minValChange } = options || {};
    if (!skipUpdateRange) {
        rangeInput[0].value = min;
        rangeInput[1].value = max;
    }

    // Setup priceGap between minVal & maxVal
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    if ((maxVal - minVal) < priceGap) {
        if (minValChange) {
            maxVal = maxVal + priceGap;
            if (maxVal > max) {
                maxVal = max;
                minVal = maxVal - priceGap;
            }
            rangeInput[1].value = maxVal;
        } else { //maxChange
            minVal = minVal - priceGap;
            if (minVal < min) {
                minVal = min;
                maxVal = min + priceGap
            }
            minVal = minVal < min ? min : minVal;
            rangeInput[0].value = minVal
        }

    }

    //Format priceInput to VN-currency
    const numberFormatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    priceInput[0].value = numberFormatter.format(minVal)
        .replace("VND", "")
        .trim();
    priceInput[1].value = numberFormatter.format(maxVal)
        .replace("VND", "")
        .trim()

    // Format slider progress    
    const rangeLength = max - min;
    const leftRange = minVal - min
    const rightRange = max - maxVal
    range.style.left = (leftRange / rangeLength) * 100 + "%";
    range.style.right = (rightRange / rangeLength) * 100 + "%";
}



priceInput.forEach(input => {
    input.addEventListener("input", e => {
        dsTmp.sort((a, b) => {
            return a.Don_gia_Ban - b.Don_gia_Ban
        });
        let min = (dsTmp[0].Don_gia_Ban);
        let max = (dsTmp[dsTmp.length - 1].Don_gia_Ban);
        input.setAttribute("min", min)
        input.setAttribute("max", max)

        if ((max - min >= priceGap) && max <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = min;
                range.style.left = ((min / rangeInput[0].max) * 100) + "%";
            } else {
                rangeInput[1].value = max;
                range.style.right = 100 - (max / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        dsTmp.sort((a, b) => {
            return a.Don_gia_Ban - b.Don_gia_Ban
        });
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        updateSlider(dsTmp, { skipUpdateRange: true, minValChange: e.target.id === "thGiaMin" });

        let dsFilter = dsTmp.filter(x => x.Don_gia_Ban <= maxVal && x.Don_gia_Ban >= minVal);

        //xuatTivi(dsFilter, thTivi);
        xuatMobile(dsFilter, tagMobile);
    });

});
/* ----------------------------------------------------------------------------------------- */



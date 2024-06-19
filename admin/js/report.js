let cuaHang={};

// Tivi

let dsHangSXTivi = [];
let chuDeTivi = [];
let dsTivi = [];
let dataTivi = [{
    name: 'Số lượng',
    data: [],
    // color: randomColor()
    
}]

// Report

const taoHangSXTivi = () => {
    dsHangSXTivi = Array.from(new Set(dsTivi.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsTivi.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase()
        }
        return nhom
    })
}

const taoBaocaoTivi=()=>{
    Highcharts.setOptions({
        lang: {
            numericSymbols: [` Ngàn`, ` Triệu`],
            numericSymbolMagnitude: 1000,
            decimalPoint: ',',  ///phân cách thập phân
            thousandsSep: '.' ///hàng ngàn
        },
        chart: {
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }
        }
    })
    
    
    Highcharts.chart('Th_Bieu_do_Tivi', {
        chart: {
            type: 'line' // column, bar, line
        },
        title: {
            text: cuaHang.Ten
        },
        subtitle: {
            text: ' Thống kê Tivi theo Nhà Sản xuất'
        },
        xAxis: {
            categories: chuDeTivi
        },
        yAxis: {
            title: {
                text: 'Số Sản phẩm'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    y:30,
                    align: 'center',
                    color:'white'
                }
            },
            column: {
                colorByPoint: true
            }
        },
        caption: {
            text: `Thống kê Số lượng Nhập hàng Tivi Theo Nhà Sản xuất `
        },
    
        series: dataTivi
    });
}

// Mobile

let dsHangSXMobile = [];
let chuDeMobile = [];
let dsMobile = [];
let dataMobile = [{
    name: 'Số lượng',
    data: [],
    //color: randomColor()
}]

// Report

const taoHangSXMobile = () => {
    dsHangSXMobile = Array.from(new Set(dsMobile.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsMobile.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase()
        }
        return nhom
    })
}

const taoBaocaoMobile=()=>{
    Highcharts.setOptions({
        lang: {
            numericSymbols: [` Ngàn`, ` Triệu`],
            numericSymbolMagnitude: 1000,
            decimalPoint: ',',  ///phân cách thập phân
            thousandsSep: '.' ///hàng ngàn
        },
        chart: {
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }
        }
    })
    
    
    Highcharts.chart('Th_Bieu_do_Mobile', {
        chart: {
            type: 'column' // column, bar, line
        },
        title: {
            text: cuaHang.Ten
        },
        subtitle: {
            text: ' Thống kê Mobile theo Nhà Sản xuất'
        },
        xAxis: {
            categories: chuDeMobile
        },
        yAxis: {
            title: {
                text: 'Số Sản phẩm'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    y:30,
                    align: 'center',
                    color:'white'
                }
            },
            column: {
                colorByPoint: true
            }
        },
        caption: {
            text: `Thống kê Số lượng Nhập hàng Mobile Theo Nhà Sản xuất `
        },
    
        series: dataMobile
    });
}
// food

let dsHangSXFood = [];
let chuDeFood = [];
let dsFood = [];
let dataFood = [{
    name: 'Số lượng',
    data: [],
    //color: randomColor()
}]

// Report

const taoHangSXFood = () => {
    dsHangSXFood = Array.from(new Set(dsFood.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsFood.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase()
        }
        return nhom
    })
}

const taoBaocaoFood=()=>{
    Highcharts.setOptions({
        lang: {
            numericSymbols: [` Ngàn`, ` Triệu`],
            numericSymbolMagnitude: 1000,
            decimalPoint: ',',  ///phân cách thập phân
            thousandsSep: '.' ///hàng ngàn
        },
        chart: {
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }
        }
    })
    
    
    Highcharts.chart('Th_Bieu_do_Food', {
        chart: {
            type: 'bar' // column, bar, line
        },
        title: {
            text: cuaHang.Ten
        },
        subtitle: {
            text: ' Thống kê Food theo Nhà Sản xuất'
        },
        xAxis: {
            categories: chuDeFood
        },
        yAxis: {
            title: {
                text: 'Số Sản phẩm'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    y:30,
                    align: 'center',
                    color:'white'
                }
            },
            column: {
                colorByPoint: true
            }
        },
        caption: {
            text: `Thống kê Số lượng Nhập hàng Food Theo Nhà Sản xuất `
        },
    
        series: dataFood
    });
}
// user
let dsHangSXUser = [];
let chuDeUser = [];
let dsUser = [];
let dataUser = [{
    name: 'Số lượng',
    data: [],
    //color: randomColor()
}]

// Report

const taoHangSXUser = () => {
    dsHangSXUser = Array.from(new Set(dsUser.map(x => x.Nhom_Nguoi_dung.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsUser.find(x => x.Nhom_Nguoi_dung.Ma_so == Ma_so).Nhom_Nguoi_dung.Ten.toUpperCase()
        }
        return nhom
    })
}

const taoBaocaoUser=()=>{
    Highcharts.setOptions({
        lang: {
            numericSymbols: [` Ngàn`, ` Triệu`],
            numericSymbolMagnitude: 1000,
            decimalPoint: ',',  ///phân cách thập phân
            thousandsSep: '.' ///hàng ngàn
        },
        chart: {
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }
        }
    })
    
    
    Highcharts.chart('Th_Bieu_do_User', {
        chart: {
            type: 'column' // column, bar, line
        },
        title: {
            text: cuaHang.Ten
        },
        subtitle: {
            text: ' Thống kê Nhân viên'
        },
        xAxis: {
            categories: chuDeUser
        },
        yAxis: {
            title: {
                text: 'Số Nhân viên'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    y:30,
                    align: 'center',
                    color:'white'
                }
            },
            column: {
                colorByPoint: true
            }
        },
        caption: {
            text: `Thống kê Số lượng Nhân viên `
        },
    
        series: dataUser
    });
}
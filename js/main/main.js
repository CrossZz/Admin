//Khai báo biến toàn cục
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

//Khi trang vừa load thì chạy code bên trong hàm getLocalStorage
getLocalStorage();

//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
    return document.getElementById(id);
}

// Xử lý UI khi thêm nhân viên
getELE("btnThem").addEventListener("click", function () {
    //Xử lý button
    getELE("btnThemNV").style.display = "block";
    getELE("btnCapNhat").style.display = "none";
    getELE("msnv").removeAttribute("disabled");
    getELE("formNV").reset();

});
// getELE("btnThem").onclick=function(){
//     getELE("btnThemNV").style.display = "block";
//     getELE("btnCapNhat").style.display = "block";
//     getELE("msnv").removeAttribute("disabled");
//     getELE("formNV").reset();
// }

//Gắn sự kiện click cho button Thêm Người Dùng
//btn.onclick = function(){}
//Khi gán hàm cho onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load
getELE("btnThemNV").onclick = themNhanVien;

//Hàm lấy thông tin nhân viên, thêm nhân viên
//Khai báo hàm
function themNhanVien() {
    //lấy thông tin nhân viên
    var _maNV = getELE("msnv").value;
    var _tenNV = getELE("name").value;
    var _email = getELE("email").value;
    var _matKhau = getELE("password").value;
    var _ngayLam = getELE("datepicker").value;
    var _chucVu = getELE("chucvu").value;

    console.log(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

    var isValid = true;

    //& : cộng chuỗi bit
    // true: 1
    //false: 0
    // 1 & 0 => 0 (false)
    // 1 & 1 => 1 (true)
    //kiểm tra mã nhân viên (mã không được để trống, mã không được trùng)
    // isValid(mới) = isValid(cũ) & validation.kiemTraRong(_maNV,"tbMaNV","Mã nhân viên không được để trống");    
    isValid &= validation.kiemTraRong(_maNV,"tbMaNV","Mã nhân viên không được để trống") && validation.kiemTraMaTrung(dsnv.mangNV,_maNV,"tbMaNV","Mã nhân viên bị trùng");

    //kiểm tra tên nhân viên
    isValid &= validation.kiemTraRong(_tenNV,"tbTen","Tên nhân viên không được để trống") && validation.kiemTraTen(_tenNV,"tbTen","Tên nhân viên phải là ký tự chữ");

    //Kiểm tra email
    isValid &= validation.kiemTraRong(_email,"tbEmail","Email không để trống") && validation.kiemTraEmail(_email,"tbEmail","Email không đúng format");

    //Kiểm tra password
    isValid &= validation.kiemTraRong(_matKhau,"tbMatKhau","Mật khẩu không để trống") && validation.kiemTraDoDai(_matKhau,"tbMatKhau","Mật khẩu có độ dài từ 6 - 8",6,8);

    //Kiểm tra ngày làm
    isValid &= validation.kiemTraRong(_ngayLam,"tbNgay","Ngày làm không được để trống");
    
    //Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Chức vụ phải được chọn");

    // isValid == true
    if(isValid) {
        //Tạo instance(thể hiện)
        var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);
        console.log(nv);
        dsnv.themNV(nv);
        console.log(dsnv.mangNV);
        //Gọi hàm
        taoBang(dsnv.mangNV);
        setLocalStorage();
    }


}

//Khai báo hàm
function taoBang(mang) {
    var tbody = getELE("tableDanhSach");
    // content chứa các thẻ tr(mỗi tr chứa thông tin 1 nv)
    var content = "";
    // map: giúp duyệt mảng (ES6)
    //reduce: ES6
    // for: cú pháp dài, tốc độ duyệt mảng nhanh (ES5)
    //forEach (ES5)

    mang.map(function (item, index) {
        //item đại diện cho 1 phần tử trong mảng
        //item chính là 1 nv
        // content = `tr mới` + content(chứa các tr trước đó)
        content += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')" >Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info" onclick="hienThiChiTiet('${item.maNV}')" >Sửa</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}

//Hàm xóa nhân viên
//Khai báo hàm
function xoaNhanVien(ma) {
    dsnv.xoaNV(ma);
    taoBang(dsnv.mangNV);
    setLocalStorage();
}
function hienThiChiTiet(ma) {
    //Lấy đối tượng nhân viên từ mảng
    var nv = dsnv.layChiTiet(ma);

    //Xử lý button
    getELE("btnThemNV").style.display = "none";
    getELE("btnCapNhat").style.display = "block";

    //Điền thông tin nhân viên lên form
    getELE("msnv").value = nv.maNV;
    getELE("msnv").disabled = "true";

    getELE("name").value = nv.tenNV;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("chucvu").value = nv.chucVu;
}

getELE("btnCapNhat").onclick = capNhatNhanVien;
function capNhatNhanVien() {
    //lấy thông tin nhân viên
    var _maNV = getELE("msnv").value;
    var _tenNV = getELE("name").value;
    var _email = getELE("email").value;
    var _matKhau = getELE("password").value;
    var _ngayLam = getELE("datepicker").value;
    var _chucVu = getELE("chucvu").value;

    //Tạo instance(thể hiện)
    var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);
    console.log(nv);

    dsnv.capNhatNV(nv);
    taoBang(dsnv.mangNV);
    setLocalStorage();

}


//Hàm lưu data xuống local storage (chỗ lưu trữ offline trong trình duyệt của người dùng) 
//Khai báo hàm
function setLocalStorage() {
    //Lưu dữ liệu xuống LocalStorage
    //chỉ cho phép lưu trữ dữ liệu kiểu json
    //chuyển kiểu mảng sang kiểu json => dùng stringify của đối tương JSON
    localStorage.setItem(
        "DSNV",
        JSON.stringify(dsnv.mangNV)
    );
}
//Khai báo hàm
function getLocalStorage() {
    //Lấy dữ liệu từ localStorage
    // parse: chuyển json sang kiểu mảng
    //Kiểm tra localStorage
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(
            localStorage.getItem("DSNV")
        );
        taoBang(dsnv.mangNV);
    }

}

// C1: click button search rồi mới tìm kiếm
getELE("btnTimNV").addEventListener("click",function(){
    var chuoiTK = getELE("searchName").value;
    var mangTK = [];
    mangTK = dsnv.timKiemNhanVien(chuoiTK);
    taoBang(mangTK);
});

//C2: gõ từ khóa vào input và search liền
getELE("searchName").addEventListener("keypress",function(){
    var chuoiTK = getELE("searchName").value;
    var mangTK = [];
    mangTK = dsnv.timKiemNhanVien(chuoiTK);
    taoBang(mangTK);
})
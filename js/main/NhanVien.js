/**
 * Author: Dev1
 * Mục Đích:
 * Chứa thông tin của Nhân Viên
 * + maNV, tenNV,email,ngayLam,matKhau,chucVu
 * 
 * Release Date: 07/02/2021
 */

function NhanVien(_maNV,_tenNV,_email,_matKhau,_ngayLam,_chucVu){
    //Thuộc tính
    //Key= value
    this.maNV = _maNV;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.chucVu = _chucVu;
}
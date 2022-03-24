/**
 * Chứa danh sách nhiều nhân viên (nhiều đối tượng nv)
 * + mangNV
 * 
 * Phương thức:
 * + thêm nv (thêm một phần tử vào mảng)
 * 
 * + cập nhật nv (thay đổi giá trị của phần tử trong mảng)
 * + tìm kiếm nv (tìm kiếm phần tử trong mảng)
 *  
 * 
 * + xóa nv (xóa một phần tử ra khỏi mảng)
 * _ Dựa vào vị trí(index) trong mảng xóa phần tử ra khỏi mảng
 * _Dựa vào mã nhân viên để xác định vị trí của nv trong mảng
 * _ tạo hàm tìm vị trí
 *  viTri = -1
 * Nếu không tìm thấy nhân viên thì viTri = -1
 * Ngược lại tìm thấy nhân viên thì viTri >-1
 * 
 * _xoaNhanVien: dựa vào kết quả của hàm tìm vị trí để xóa nv ra khỏi mảng
 */

 function DanhSachNhanVien(){
     //Thuộc tính
     this.mangNV = [];

    //Phương thức
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }
    this.timViTri = function(ma){
        var viTri = -1;
        this.mangNV.map(function(item,index){
            if(item.maNV == ma){
                //tìm thấy nhân viên trong mảng
                viTri = index;
            }
        });

        return viTri;
    }
    this.xoaNV =function(ma){
        var viTri = this.timViTri(ma);
        if(viTri != -1){
            //tìm thấy nhân viên
            this.mangNV.splice(viTri,1);
        }
    }
    this.layChiTiet = function(ma){
        var viTri = this.timViTri(ma);
        var nv = "";
        if(viTri != -1){
            nv= dsnv.mangNV[viTri];
        }
        return nv;
    }
    this.capNhatNV = function(nv){
        var viTri = this.timViTri(nv.maNV);
        if(viTri != -1){
            dsnv.mangNV[viTri] = nv ;
        }
    }

 }

 //prototype
 DanhSachNhanVien.prototype.timKiemNhanVien = function(chuoiTK){
     var mangTimKiem = [];

    this.mangNV.map(function(item){
        var tenThuong = item.tenNV.toLowerCase();
        var chuoiTKThuong = chuoiTK.trim().toLowerCase();        
        // Nguyen Van (tên)=> nguyen van
        // NGUYEN  (chuỗi tìm) => nguyen
        //indexOf: nếu tìm thấy ký tự chữ trùng với tên nhân viên thfi trả về vị trí chữ tìm thấy
        if(tenThuong.indexOf(chuoiTKThuong) > -1){
            //Tìm thấy
            mangTimKiem.push(item);
        }
    });

    return mangTimKiem;

 }
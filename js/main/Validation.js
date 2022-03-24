function Validation(){
    //Phương thức
    this.kiemTraRong = function(value, spanID, message){
        // trim(): xóa dấu khoảng cách trước và sau chuỗi
        if(value.trim() != ""){
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.kiemTraMaTrung = function(mangNV,value,spanID, message){
        /**
         * 1. duyệt mảng nhân viên
         * 2. Kiểm tra mã nhân viên có bị trùng với value hay không
         *  => bị trùng => return false
         *  => không bị trùng => return true
         */

        //  some
        //không có mã nhân viên bị trùng
        var isExist = false;
        isExist = mangNV.some(function(item){
            //Tìm kiếm value(giá trị người dùng nhập) có tồn tại trong mangNV chưa
            return value === item.maNV;
        });

        if(isExist){
            //Mã bị trùng
            // Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }else{
            //Mã không trùng
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }

    }

    this.kiemTraTen = function(value,spanID,message){
        // C1: sử dụng đối tượng RegExp
        //điền 1 chuỗi string
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựýỳỵỷỹ\\s]+$");

        if(pattern.test(value)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.kiemTraEmail = function(value,spanID,message){
        // C2: sử dụng chuỗi của RegExp
        var formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(formatEmail)){
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            //Không hợp lê
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
    this.kiemTraDoDai = function(value,spanID,message,min,max){
        if(value.length >=min && value.length <= max){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.kiemTraChucVu = function(selectID,spanID, message){
        var index = document.getElementById(selectID).selectedIndex;
        if(index != 0){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }else{
             //không hợp lệ
             document.getElementById(spanID).innerHTML = message;
             document.getElementById(spanID).style.display = "block";
             return false;
        }
    }
}
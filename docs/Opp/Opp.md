# OOP

- Lập trình hướng đối tượng là kỹ thuật, phương pháp lập trình sử dụng các đối tượng để xây dựng ứng dụng

## Tính chất

### Tính đóng gói

- Cho phép người dùng trực tiếp tác động đến dữ liệu của đối tượng mà phải thông qua các phương thức và đối tượng cung cấp
- Giúp đảm bảo tính toàn vẹn của đối tượng
- Tính đóng gói được triển khai bằng cách sử dụng các access modifier:
  - Public : Có thể truy cập ở bất cứ đâu
  - private : Chỉ có thể truy cập bên trong class
  - protected : Chỉ có thể truy cập bên trong class và các class kết thừ từ class đó
  - internal : Giống như public nhưng chỉ hạn chế trong 1 assembly

### Tính kế thừa

- Tính kế thừa cho phép tạo ra 1 class con có sẵn và mở rộng class đó
- Các class con có thể kế thừa lại các thuộc tính và phương thức của class cha
- Có thể không cần định nghĩa lại các phương thức hoặc tái định nghĩa (override) hoặc thêm các phương thức sử dụng riêng ở lớp con

```c#
public class Square:Rectangle{
    public string name;
    public Square(double w,double h,string n): base ( w, h){
        name = n;
        width = w;
        height = h;
    }
```

### Tính đa hình

- Tính đa hình cho phép 1 hành động có thể được thực hiện bằng nhiều cách khác nhau
- Tức là một method có thể thực hiện một hành động khác nhau tùy thuộc vào loại đối tượng mà nó được gọi trên.
- Có 2 cách vận dụng tính đa hình :
  - Overloading : Trong 1 class các method có cùng tên nhưng kiểu trả về và tham số khác nhau
  - Overriding : Các method được thực hiện ở các lớp con kế thừa từ lớp cha với chức năng khác (Lớp cha dùng virtual, lớp con dùng override)

### Tính trừu tượng

- Tổng quát hóa 1 đối tượng, ẩn đi nhưng thông tin chi tiết bên trong, chỉ thể hiện ra những thông tin cần thiết ra bên ngoài, và nhìn vào thông tin bên ngoài đó ta hiểu được đối tượng đó làm gì.
- Sử dụng abstract class hoặc interface để định nghĩa cấu trúc và hành vi chung cho các lớp con mà không cần triển khai chi tiết cụ thể của từng lớp con.
- Được sử dụng qua interface và absstract class
- Interface thì phải implement còn abstract class thì phải extend

#### Interface

- Not class
- Chứa method,properties trống không có thực thi
- Giống như khuôn mẫu, khung để các lớp implement và follow
- Các class có thể implements nhiều interface
- Các class implement các method theo như interface đã định nghĩa

```c#
interface IAnimal{
	void Type();
}
class Dong:IAnimal{
	public void Type(){
		Console.WriteLine("Gau gau");
	}
}
```

#### Abstract class

- Các class chỉ kế thừa 1 Abstract class
- Có 2 loại method là abstract method và method thường :
  - abstract method là method trống không, đang dang dở chưa rõ thực thi, các lớp implement phải hoàn thành nốt tính năng này
  - method thường là method có thực thi bình thường

````c#
abstract class Person{
    public abstract void talk();
}

class Trung:Person{
	public override void talk(){
		Console.WriteLine("Hello Trung");
	}
}```
````
### Đa kế thừa 
- 1 lớp có thể kế thừa nhiều interface
```c#
using System;

interface IDrawable
{
    void Draw();
}

interface IResizable
{
    void Resize();
}

class Shape : IDrawable, IResizable
{
    public void Draw()
    {
        Console.WriteLine("Drawing shape");
    }

    public void Resize()
    {
        Console.WriteLine("Resizing shape");
    }
}

class Program
{
    static void Main()
    {
        Shape shape = new Shape();
        shape.Draw();    // In ra: Drawing shape
        shape.Resize();  // In ra: Resizing shape
    }
}

```
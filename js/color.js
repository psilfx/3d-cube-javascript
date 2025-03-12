/**
 ** @desc Объект для работы с цветом, используется для смешивания и вывода цвета на рендер
 **/
class Color{
	r = 0;
	g = 0;
	b = 0;
	a = 1;
	constructor( r = 255 , g = 255 , b = 255 , a = 1 ){
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	/**
	 ** @desc Избавляемся от значения альфа канала
	 **/
	SetAlpha(){
		this.r *= this.a;
		this.g *= this.a;
		this.b *= this.a;
		this.a = 1;
	}
	/**
	 ** @desc Смешивает два цвета
	 ** @vars (Color) color - цвет для смешивания
	 **/
	Mix( color ) {
		color.SetAlpha();
		let r = this.r + color.r;
		let g = this.g + color.g;
		let b = this.b + color.b;
		let a = this.a;
		return new Color( parseInt( r * 0.5 ) , parseInt( g * 0.5 ) , parseInt(  b * 0.5 ) , a );
	}
	/**
	 ** @desc Умножает значения всех каналов, возвращает новый цвет
	 ** @vars (number) num - число на которое нужно умножить
	 **/
	Multiply( num ) {
		let r = this.r * num;
		let g = this.g * num;
		let b = this.b * num;
		let a = this.a;
		return new Color( r , g , b , a );
	}
	/**
	 ** @desc Создаёт копию объекта цвета
	 **/
	Copy() {
		return new Color( this.r , this.g , this.b , this. a );
	}
	/**
	 ** @desc Преобразуем значения в строку, применяется при выводе в рендер
	 **/
	ToString() {
		return "rgb( " + this.r * this.a + "," + this.g * this.a + "," + this.b * this.a + " )";
	}
}
/**
 ** @desc Объект для отрисовки фигур
 **/
class Draw {
	/**
	 ** @desc Основной метод. Рисует 3д фигуру. 
	 ** @vars (Shape3D) figure - объект фигуры, (Color) color - цвет для отрисовки фигуры
	 **/
	Draw3DFigure( figure , color ) {
		let triangles = figure.GetTranslatedTriangles();
		let light     = globalLight;
		for( let t = 0; t < triangles.length; t++ ) {
			let triangle = triangles[ t ];
			let points   = triangle.GetPoints();
			let normal   = triangle.GetNormal();
			let frags    = triangle.GetFrags();
			let triColor = this.GetColorFromPoint( points[ 0 ] , normal , frags[ 0 ] , light , color );
				context.fillStyle   = triColor;
				context.strokeStyle = triColor;
				context.lineWidth   = 0;
			this.DrawTriangle( points );
		}
	}
	/**
	 ** @desc Получает цвет точки и смешиваем с источником света, возвращает строчное значение цвета
	 ** @vars (Vector3F) point - точка для получения цвета, (Vector3F) normal - нормаль точки, (Vector3F) frag - мировые координаты точки, (object) light - объект цвета, (Color) color - цвет фигуры
	 **/
	GetColorFromPoint( point , normal , frag , light , color ) {
		let dot           = normal.Dot( light.position.Subtract( frag ).Normalize() );
		let fragColorDiff = Math.max( Math.min( dot , 1 ) , light.ambient );
		let fragColorDist = light.position.Distance( frag ) * ( light.length / zFar );
		let distDiff      = fragColorDiff * fragColorDist;
		let fragColor     = color.Copy().Multiply( fragColorDiff );
		let lightColor    = light.color.Multiply( distDiff ).Mix( fragColor );
		return lightColor.ToString();
	}
	/**
	 ** @desc Рисует треугольник
	 ** @vars (array) points - массив точек треугольника
	 **/
	DrawTriangle( points ) {
		context.beginPath();
		this.MoveToPoint( points[ 0 ] );
		this.LineToPoint( points[ 1 ] );
		this.LineToPoint( points[ 2 ] );
		this.LineToPoint( points[ 0 ] );
		context.fill();
		context.stroke();
	}
	/**
	 ** @desc Рисует линию к точке
	 ** @vars (Vector3F) point - точка к которой идёт линия
	 **/
	LineToPoint( point ) {
		context.lineTo( widthH + point.x * figscaleX , heightH + point.y * figscaleY );
	}
	/**
	 ** @desc Стартовая точка для начала отрисовки треугольника
	 ** @vars (Vector3F) point - точка начала отрисовки
	 **/
	MoveToPoint( point ) {
		context.moveTo( widthH + point.x * figscaleX , heightH + point.y * figscaleY );
	}
}

const draw = new Draw();
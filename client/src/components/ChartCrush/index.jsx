import {useEffect} from "react";

export const Chart = ({width, height, point_x=10, id, is_stop}) => {
  const func = x => Math.pow(1.12755, x);
  const step = width / 27;

  const padding = 10;
  const origin_x = padding, origin_y = height - padding;
  const origin_coords = [origin_x, origin_y];

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const point = (x, y, r=1) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
      ctx.fill();
    }

    // grid
    ctx.strokeStyle = '#45464A';
    ctx.lineWidth = 1;
    ctx.beginPath();

    const max_cols = 5, min_cols = 3;
    const max_rows = 5, min_rows = 3;

    const col_count = (point_x*step + 1 >= width - padding*2) ? point_x % min_cols + max_cols - min_cols + 1 : 5;
    const width_cell = Math.ceil((width - 2*padding) / col_count);
    const row_count = (point_x*step + 1 >= width - padding*2) ? func(point_x) % min_rows + max_rows - min_rows + 1 : 4;
    const height_cell = Math.ceil((height - 2*padding) / row_count);

    // verticals
    for (let i = 1; i < col_count; i++) {
      ctx.moveTo(origin_x + i*width_cell, origin_y);
      ctx.lineTo(origin_x + i*width_cell, padding);
    }

    // horizontals
    for (let i = 1; i < row_count; i++) {
      ctx.moveTo(origin_x, origin_y - i*height_cell);
      ctx.lineTo(width - padding, origin_y - i*height_cell);
    }

    ctx.stroke();

    // axis & border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.moveTo(...origin_coords);
    ctx.lineTo(origin_x, padding);
    ctx.lineTo(width - padding, padding);
    ctx.lineTo(width - padding, origin_y);
    ctx.lineTo(...origin_coords);

    ctx.stroke();

    // plot
    ctx.strokeStyle = is_stop ? '#ED2E4C' : '#10C964';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(...origin_coords);

    for (let i = 0; i < point_x; i += 0.01) {
      if (i*step + 1 > width - padding*2 || origin_y - func(i)*step + step - padding < 0) {
        break;
      }
      // point(origin_x + i*step, origin_y - func(i)*step + step)
      ctx.lineTo(origin_x + i*step, origin_y - func(i)*step + step);
    }
    ctx.stroke();

    // coefficient
    ctx.fillStyle = is_stop ? '#ED2E4C' : '#ffffff'
    ctx.font = "bold 80px Arial";
    const coef = point_x ? Math.round(func(point_x)*10) / 10 : 0;
    ctx.fillText(`${coef}x`, width / 2 - 80, height / 2 + 20);
  }, [point_x]);

  return (
    <>
      <canvas id={id} width={width} height={height}></canvas>
    </>
  );
}
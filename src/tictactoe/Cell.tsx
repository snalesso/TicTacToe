import { Square } from '../core/Geometry';
import calcActiveFields from '../core/utils';
import './Cell.css';
import { DEFAULT_CELL_SIDE_LENGTH } from './Configs';

export interface IBoardCell<T> {
  readonly value: T;
  readonly onClick: () => void;
  readonly size?: Square;
  readonly isWinning: boolean;
  readonly isLocked?: boolean;
}

export default function Cell<T>(config: IBoardCell<T>) {
  const style = {
    width: config.size?.width ?? DEFAULT_CELL_SIDE_LENGTH,
    height: config.size?.height ?? DEFAULT_CELL_SIDE_LENGTH,
  };
  const text = config.value === null
    ? ''
    : typeof config.value === 'string' || config.value instanceof String
      ? config.value
      : JSON.stringify(config.value);
  const classes = calcActiveFields({
    'cell': true,
    'winning': config.isWinning,
    'locked': config.isLocked ?? false
  }).join(' ');
  // const [classes, setClasses] = useState(calcClasses());
  // const unsubClasses = useEffect(() =>  , [config.isWinning]);
  // const classes = calcActiveFields({ "cell": true, "winning": config.isWinning }).join(' ');
  return (
    <div className={classes} onClick={config.onClick} style={style}>
      {text}
    </div>
  )
}
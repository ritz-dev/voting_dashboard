import cn from 'classnames';
import { twMerge } from 'tailwind-merge';
import styles from './loader.module.css';

interface Props {
    className?: string;
    text?: string;
    showText?: boolean;
    simple?: boolean;
    height?: string;
}


const Loader = ( props: Props) => {
    const { className, showText = true, text= 'Loading...',height='calc(100vh - 200px)', simple } = props;
    return (
        <>
            {simple ? (
                <div className={cn(className, styles.simple_loading)} />
            ) : (
                <div
                    className={twMerge(
                        cn('w-full flex flex-col items-center justify-center', className)
                    )}
                    style={{height: height}}
                >
                    <div className={styles.loading}/>

                    {showText && (
                        <h3 className='text-lg font-semibold text-body italic'>
                            {text}
                        </h3>
                    )}

                </div>
            )
            }
        </>
    )
}

export default Loader;
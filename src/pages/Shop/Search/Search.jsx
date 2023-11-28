import className from 'classnames/bind';
import * as request from '../../../utils/request';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import useDebounce from '../../../hook/useDebounce';

const cx = className.bind(styles);

function Search() {
    const [searchValue, setsearchValue] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [showResult, setshowResult] = useState(true);
    const [loadding, setloadding] = useState(false);

    const debounce = useDebounce(searchValue, 700);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setsearchResult([]);
            return;
        }

        setloadding(true);

        const fetchApi = async () => {
            try {
                const res = await request.get('search/keyword', {
                    params: {
                        q: debounce,
                        page: 1,
                        limit: 5,
                    },
                });
                console.log(res);
                setsearchResult(res);
                setloadding(false);
            } catch (error) {
                setloadding(false);
            }
        };

        fetchApi();
    }, [debounce]);

    const handleClear = () => {
        setsearchValue('');
        setsearchResult([]);
        inputRef.current.focus();
    };

    const handlehiddenResult = () => {
        setshowResult(false);
    };
    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            // Thực hiện chuyển hướng đến trang tìm kiếm với query parameter
            window.location.href = `/search/${searchValue}`;
        }
    };
    return (
        <span>
            <Tippy
                visible={showResult && searchResult.length > 0}
                zIndex={0}
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <h3 className={cx('search-title')}>Sản phẩm:</h3>
                        {searchResult.map((result, index) => (
                            <Link
                                to={`/detail/${result.slug}`}
                                onClick={handleClear}
                                key={index}
                                className={cx('item-result')}
                            >
                                <div className={cx('img-product')}>
                                    <img src={result.image_url} alt={result.name} />
                                </div>
                                <div className={cx('info-product')}>
                                    <h3>{result.name}</h3>
                                    <h4>{result.price}đ</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                onClickOutside={handlehiddenResult}
            >
                <div className={cx('search')}>
                    <input
                        value={searchValue}
                        ref={inputRef}
                        type="text"
                        placeholder="Tìm kiếm..."
                        spellCheck={false}
                        onChange={(e) => setsearchValue(e.target.value)}
                        onFocus={() => setshowResult(true)}
                    />

                    {loadding && (
                        <button className={cx('btn-loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}

                    {!!searchValue && !loadding && (
                        <button className={cx('btn-clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}

                    <Link onClick={handleSearch} className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </Tippy>
        </span>
    );
}

export default Search;

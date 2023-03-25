import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Input from './components/Input/input';
import Transition from './components/Transition/transition';

const App: React.FC = () => {
    /* const [title, setTitle] = useState('');
    const postData = {
        title: 'my own title',
        body: 'hello vv^^'
    };
    useEffect(() => {
        axios
            .post('https://jsonplaceholder.typicode.com/posts', postData)
            .then((resp) => {
                console.log(resp);
                setTitle(resp.data.title);
            });
    }); */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedFile = files[0];
            const formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios
                .post('https://jsonplaceholder.typicode.com/posts', formData, {
                    // jsonplaceholder只能上传比较小的文件，大的要报错
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((resp) => {
                    console.log(111, resp);
                });
        }
    };
    return (
        <div
            className="App"
            style={{ marginTop: '100px', marginLeft: '100px' }}
        >
            <input type="file" name="myFile" onChange={handleFileChange} />
            {/* <header className="App-header">
                <h1>{title}</h1>
            </header> */}
            {/* <Icon icon="arrow-down" theme="primary" size="10x" /> */}
            {/* <Input
                style={{ width: '300px' }}
                // size="lg"
                // prepend="https://"
                // append=".com"
                icon="search"
                placeholder="优雅漂亮的Input占位符"
                // disabled
            /> */}
            {/* Menu组件 */}
            {/* <Menu
                defaultIndex="0"
                mode="horizontal"
                onSelect={(index) => {
                    alert(index);
                }}
            >
                <MenuItem>cool link 1</MenuItem>
                <MenuItem>cool link 2</MenuItem>

                <SubMenu title="dropdown">
                    <MenuItem>drop1</MenuItem>
                    <MenuItem>drop2</MenuItem>
                    <MenuItem>drop3</MenuItem>
                </SubMenu>
                <MenuItem>cool link 3</MenuItem>
                <MenuItem disabled>cool link 4</MenuItem>
                <MenuItem>
                    Link<a href="http://www.google.com"></a>
                </MenuItem>
            </Menu> */}

            {/* 测试自己写的 Transition */}
            {/* <Button
                size="lg"
                onClick={() => {
                    setShow(!show);
                }}
            >
                Toggle
            </Button>
            <Transition in={show} timeout={300} animation="zoom-in-left">
                <div>
                    <p>
                        Edit <code>src/app.tsx</code> and👼👼👼
                    </p>
                </div>
            </Transition>

            <Transition
                in={show}
                timeout={3000}
                animation="zoom-in-left"
                wrapper
            >
                <Button btnType="primary" size="lg">
                    a large button
                </Button>
            </Transition> */}

            {/* Button组件 */}
            {/* default button */}
            {/* <Button
        className="11111111"
        btnType={ButtonType.Default}
        size={ButtonSize.Large}
      >
        Default
      </Button>
      <Button btnType={ButtonType.Default}>Default</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>
        Default
      </Button>
      <Button disabled btnType={ButtonType.Default} size={ButtonSize.Small}>
        Default
      </Button>
      <hr /> */}

            {/* primary button */}
            {/* <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Primary
      </Button>
      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Primary
      </Button>
      <Button disabled btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Primary
      </Button>
      <hr /> */}

            {/* danger button */}
            {/* <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Danger
      </Button>
      <Button btnType={ButtonType.Danger}>Danger</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Danger
      </Button>
      <Button disabled btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Danger
      </Button>
      <hr /> */}

            {/* link button */}
            {/* <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        href="http://www.baidu.com"
      >
        Link
      </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        Link
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href="http://www.baidu.com"
      >
        Link
      </Button>
      <Button
        disabled
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href="http://www.baidu.com"
      >
        Link
      </Button>
      <hr /> */}
        </div>
    );
};

export default App;

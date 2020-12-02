import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;

    header{
        display: flex;
        align-items: center;
    }

    header img{
        height: 120px;
    }
    span{
        font-size: 20px;
        margin-left: 24px;
        color: #000000;
        
    }
    header a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        height: 40px;
        line-height: 40px;
        padding: 10px 5px;
    
        width: 260px;
        margin-left: auto;
        margin-top: 0;
        height: 60px;
        background: white;
        border-radius: 10px;
        color: black;

        &: hover {
            background: ${shade(0.2, 'gray')};  
        }
    }
    header button {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #000000;
    }
    header button:hover{
        border-color: #000000 ;
    }

    h1{
        margin-top: 80px;
        margin-bottom: 24px;
        color: #000000;
    }

    div{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }

    ul{
        display: grid;
        grid-gap: 10px;
        padding: 10px;
        list-style: none;
    }
    
    ul li{
        background: #fff;
        padding: 24px;
        border-radius: 8px;
        position: relative;
    }
    
    ul li button{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        line-height: 40px;


        appearance: none;
        background: #d3d3d3;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #000000;
        width: 48%;
        }
    }
    
    ul li button:hover{
        opacity: 0.8;
    }
    
    ul li strong{
        display: block;
        margin-bottom: 16px;
        color: #000000;
    }
    
    ul li p + strong{
        margin-top: 32px;
    }
    
    ul li p{
        color: #000000;
        line-height: 21px;
        font-size: 16px;
    }

    ul img{
        height: 300px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    ul div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    ul a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        line-height: 40px;


        appearance: none;
        background: #d3d3d3;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #000000;
        width: 48%;
        }
    }
`;
import React, { useEffect, useRef, useState } from "react";
import classes from './Tab.module.css';


const Xmark = (props) => {
    const deleteTab = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onDelete();
    }
    return (
        <span className={props.cssClass}>
            <svg onClick={deleteTab}  xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
        </span>
    )
}

const PlusIcon = (props) => {
    return (
        <span onClick={props.onAdd} style={{marginLeft: "1rem", cursor: "pointer"}}>
            <svg xmlns="http://www.w3.org/2000/svg"  height="16px" width="16px" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </span>
    )
}


const ChevronIcon = (props) => {
    return (
        <span className={props.disable ? `${classes.chevronIcon} ${classes.disable}` : `${classes.chevronIcon}`} onClick={props.onChevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className={props.dir == 'left' ? `${classes.left}` : `${classes.right}`} height="16px" width="16px" viewBox="0 0 320 512" ><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg>
        </span>
    )
}


export const Tab = props => {  
    const onDragging = (e) => {
        e.dataTransfer.setData('el', e.target.id)
    }
    return (
        <div id={props.id} draggable="true" onDragStart={onDragging} onClick={props.onTabClick} 
             className={props.active? `${classes.tabTitle} ${classes.active}` : classes.tabTitle}>
                 {props.title}
            {
             props.len > 1 &&  <Xmark cssClass={classes.xMark} onDelete={props.onDelete} />
            }
        </div>
    )
}

const TabContent = (props) => {
        if(!props.content) {
            return (
                <div className={classes.tabBody}>
                     <h4>No Tab Selected</h4>
                </div>
            )
        } else {
            return (
                <div className={classes.tabBody}>
                    {props.content}
                 </div>
            )
        }
       
    
}


export const Tabs  = (props) => {
    const [state, setState] = useState([]);
    const [activeTab, setActiveTab] = useState({});
    const tabsContainer = useRef();
    const [scrollPosition, setScrollPosition] = useState('');


    useEffect( () => {
       let tabs =  props.children.map( item => {
            return item.props
        })
        setState(tabs);
    }, [props.children]);

    useEffect( () => {
        let el = tabsContainer.current;
        rightScrollCalc(el)
    }, [state.length])

    const onTabSelection = (e) => {
        const selectedTab = state.filter( t => t === e);
        setActiveTab(selectedTab[0]);
    }

    const onLeft = (e) => {
        e.preventDefault();
        let el  = tabsContainer.current;
        el.scrollLeft -= 200;
        if(el.scrollLeft == 0 || el.scrollLeft == 20) {
            setScrollPosition('left');
        } else {
            setScrollPosition('');
        }
    }

    const onRight = (e) => {
        e.preventDefault();
        let el  = tabsContainer.current;
        el.scrollLeft += 200;
        rightScrollCalc(el)
    }

    const rightScrollCalc =(el) => {
        let pos = parseInt( el.scrollWidth)  - parseInt( el.offsetWidth );
        if( pos == parseInt( el.scrollLeft )) {
            setScrollPosition('right');
        } else {
            setScrollPosition('');
        }
    }

    const onAddNewTab = (e) => {
        e.preventDefault();
        let len = state.length;
        let title = `Tab${len+1}`;
        let children = `${title} content`;
        let newTab = {title, children };
        setState([...state, newTab]);
    }

    const onTabDelete = (e) => {
        const tabs = state.filter( t => t != e);
        setState(tabs);
        setActiveTab({})
    }

    const drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('el');
        if(e.target.id === 'dropZone') {
            e.target.appendChild(document.getElementById(data));
        } else  {
            e.target.before(document.getElementById(data));
        }
    }

    const allowDrop = (e) => {
        e.preventDefault();
        

    }

    return (
        <div className={classes.tab}>
            <div  className={classes.tabHeader}>
                <ChevronIcon disable={scrollPosition == 'left'} onChevClick={onLeft} dir="left" />
                <div onDrop={drop} 
                id="dropZone"
                onDragOver={allowDrop}
                ref={tabsContainer} 
                className={classes.dTabs}>
                    {state.map(t => 
                    {
                        const uniqueId = t.title + Math.floor(Math.random()*(999-100+1)+100);
                       return  <Tab key={uniqueId}
                        id={uniqueId}
                        active={activeTab === t} 
                        title={t.title}
                        len={state.length}
                        onTabClick={() => onTabSelection(t)}
                        onDelete ={() => onTabDelete(t)} /> 
                    }
                    )}
                </div>
                <ChevronIcon disable={scrollPosition == 'right'} onChevClick={onRight} dir="right" />
                <PlusIcon onAdd={onAddNewTab} />
            </div>
            <TabContent content={activeTab.children} />
        </div>
    )
}



import React, { useEffect, useRef, useState } from "react";
import ChevronIcon from "./Chevron";
import PlusIcon from "./Plus";
import classes from './Tab.module.css';
import Xmark from "./Xmark";

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



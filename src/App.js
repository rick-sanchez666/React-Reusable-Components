import './App.css';
import {Tabs, Tab} from './components/Tab';
  
function App() {
  return (
    <div className="App">
      <header>
        <h2> React Components Customized</h2>
      </header>

      <main>
        <section >
          <h2 style={{margin: '1rem 0'}}>Tabs</h2> 
        <Tabs list={[{title: "From list prop", children: "Some content "}]}>
            <Tab title= "Tab1">
              Tab1 content
            </Tab>
            <Tab title= "Tab2">
              Tab2 content
            </Tab>
            <Tab title= "Tab3">
              Tab3 content
            </Tab>
        </Tabs>
        </section>
      </main>
    </div>
  );
}

export default App;

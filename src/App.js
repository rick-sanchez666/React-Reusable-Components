import logo from './logo.svg';
import './App.css';
import {Tabs, Tab} from './components/Tab';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Custom Tab</h2>
      </header>

      <main>
        <Tabs>
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
      </main>
    </div>
  );
}

export default App;

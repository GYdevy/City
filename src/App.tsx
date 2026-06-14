import { useState } from 'react';
import { Layout, type TabId } from './components/Layout';
import { useGameStore } from './state/gameStore';
import { ArmyScreen } from './screens/ArmyScreen';
import { BattlePlannerScreen } from './screens/BattlePlannerScreen';
import { CityScreen } from './screens/CityScreen';
import { IdeologyScreen } from './screens/IdeologyScreen';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('city');
  const { state, nextTurn, upgradeBuilding, resetSave } = useGameStore();

  return (
    <Layout
      activeTab={activeTab}
      gameState={state}
      onChangeTab={setActiveTab}
      onNextTurn={nextTurn}
      onResetSave={resetSave}
    >
      {activeTab === 'city' && <CityScreen gameState={state} onUpgradeBuilding={upgradeBuilding} />}
      {activeTab === 'ideology' && <IdeologyScreen />}
      {activeTab === 'army' && <ArmyScreen />}
      {activeTab === 'battlePlanner' && <BattlePlannerScreen />}
    </Layout>
  );
}

export default App;

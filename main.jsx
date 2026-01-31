import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * シングルファイル構成にするため、App コンポーネントを同一ファイル内に定義するか、
 * あるいは GitHub 上のファイル構成（App.jsx がルートに存在すること）を前提とします。
 * インポートエラーを回避するため、ロジックを統合した形式で再構成します。
 */

// もし App.jsx が見つからない場合のエラーを避けるため、
// ここに直接 App コンポーネントの内容を展開するか、
// 明示的にインポートを試みます。
import App from './App.jsx';

const RootApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RootApp />);
}

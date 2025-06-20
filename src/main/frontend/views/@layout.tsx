import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title;
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const menuRef = useRef<Menu>(null);

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }
  }, [currentTitle]);

  const menuItems = createMenuItems().map(({ to, title, icon }) => ({
    label: title,
    icon: icon || '', // PrimeIcons format: 'pi pi-home', or leave empty
    command: () => {
      navigate(to);
      setSidebarVisible(false);
    },
  }));

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
        <Button
          icon="pi pi-bars"
          className="p-button-text"
          onClick={() => setSidebarVisible(true)}
          aria-label="Toggle menu"
        />
        <h1 className="text-xl font-semibold">{documentTitleSignal}</h1>
      </div>

      {/* Sidebar / Drawer */}
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="text-lg font-semibold mb-3">My App</div>
            <Menu model={menuItems} ref={menuRef} />
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="p-4 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export type TabId = 'home' | 'templates' | 'users' | 'developer' | 'settings';

export interface NavItem {
  id: TabId;
  label: string;
  tabText: string;
}

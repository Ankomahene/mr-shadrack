import { SocialHandles } from './SocialHandles';

export const Header = () => {
  return (
    <div className="flex justify-end items-center py-4" id="header">
      <div className="bg-card rounded-full py-2 px-4 shadow-sm">
        <SocialHandles />
      </div>
    </div>
  );
};

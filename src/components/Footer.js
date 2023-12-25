export function Footer () {
    return (
      <footer className="">
        <p>Made by Arinaymay Bhaskar</p>
        <div className="flex gap-2 items-center">
        <a className="text-black" href="https://github.com/Arinaymaybhaskar">
            <img src="/github.svg" alt=""  className="w-5 h-5"/>
        </a>
        <a className="text-black" href="https://www.linkedin.com/in/arinaymay/">
            <img src="/linkedin.svg" alt="" className="w-7 h-7"/>
        </a>
        </div>
      </footer>
    );
  }
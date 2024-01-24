import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cometchat-conversations-wrapper',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {


  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
  }

  redirect(name:string) {
    this.router.navigate([name]);
  }
}

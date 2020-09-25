import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Block {
  id: number;
  startTime: string;
  started: boolean;
}

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit {
  blocks: Block[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getBlocks().subscribe((data) => {
      this.blocks = data;
    });
  }

  startBlock(time: string): void {
    this.api.startBlock(time).subscribe();
  }
}

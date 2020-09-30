import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Block } from '../models';

@Component({
  selector: 'app-start-blocks',
  templateUrl: './start-blocks.component.html',
  styleUrls: ['./start-blocks.component.scss'],
})
export class StartBlocksComponent implements OnInit {
  blocks: Block[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.updateBlocks();
  }

  startBlock(id: number): void {
    this.api.startBlock(id).subscribe(() => {
      this.updateBlocks();
    });
  }

  updateBlocks(): void {
    this.api.getBlocks().subscribe((data) => {
      this.blocks = data;
    });
  }
}
